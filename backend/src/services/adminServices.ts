import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { adminData, adminSchema } from "../validators/adminValidator";
import { signToken } from "../utils/jsonwebtoken";
import { admin } from "@prisma/client";
import { sendPasswordResetLink } from "../utils/emailTransporter"
import { generateReferallCode } from "../utils/referralCodeGenerator";
import { throwError } from "../middleware/errorHandler";

export const registerAdmin = async (data: adminData) => {
    const validateAdminData = adminSchema.safeParse(data);
    if (!validateAdminData.success) {
        const errors = validateAdminData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
        );
        throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }

    // Check if admin already exists
    const checkAdminAvailability = await prisma.admin.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!checkAdminAvailability) {
        const HashedAdminPassword = await hash(data.password);
        const registrationCodes = await generateReferallCode();

        // Save admin to the database
        const saveAdmin = await prisma.admin.create({
            data: {
                ...data,
                generatedRegistrationCodes: registrationCodes,
                maxUsedCode: 5, 
                totalCodeUsed: 0,
                password: HashedAdminPassword,
            },
        });

        const token = signToken({ id: saveAdmin.id, role: "admin" });
        const { password, ...adminDataWithoutPassword } = saveAdmin;
        return { adminDataWithoutPassword, token };
    } else {
        throwError(HttpStatus.CONFLICT, "Admin already exists");
    }
};



export const signInAdmin = async(email: string, password: string)=>{
    const findAdmin = await prisma.admin.findUnique({where: {email}})
    if(!findAdmin){
       throwError(HttpStatus.NOT_FOUND, "Admin does not exist")

    }else{
        const verifiedPassword = await compare(password, findAdmin.password)
        if(!verifiedPassword){
           throwError(HttpStatus.UNAUTHORIZED, "Invalid email or password")
        }else{
            return findAdmin
        }

    }
}


export const verifyOtp = async (email: string, otp: string) => {
    const admin = await prisma.admin.findUnique({ where: { email } });
  
    // Check if admin exists
    if (!admin) {
      throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP or not found");
    }
  
    // Check if the OTP matches
    if (admin!.otp !== otp) {
      throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
    }
  
    // Generate a JWT token if OTP is correct
    const token = signToken({ id: admin!.id, role: 'admin' });
  
    // Clear the OTP from the database after successful verification
    await prisma.admin.update({
      where: {
        id: admin!.id,
      },
      data: { otp: null },
    });
  
    return token;
  };
  

export const updateAdmin = async(id: string, updateData: Partial<admin> )=>{
    const findAdmin = await prisma.admin.findUnique({
        where:{
            id
        }
    })
    if(!findAdmin){
       throwError(HttpStatus.NOT_FOUND, "admin not found");
    }else{
        if(updateData.password){
            const hashpassword = await hash(updateData.password);
            if(!hashpassword){
               throwError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error hashing password"
                  );
            }
            updateData.password = hashpassword
        }
        const updatedAdmin = await prisma.admin.update({
            where: {id},
            data: updateData,
        });
        const {password, ...adminDataWithoutPassword} = updatedAdmin
        return adminDataWithoutPassword
    }

};


export const fetchAdminByEmail = async(email: string)=>{
    const findAdmin = await prisma.admin.findUnique({
        where:{
            email
        }
    })
    return findAdmin
};


export const fetchAllAdmins = async()=>{
    const fetchedAdmins = await prisma.admin.findMany();
    return fetchedAdmins

};


export const fetchAdminById = async(id: string)=>{
    const findAdmin = await prisma.admin.findUnique({
        where: {
            id
        }
    })
    return findAdmin
};


export const deleteAdminRecords = async(id: string)=>{
    const deletedAdmin = await prisma.admin.delete({
        where:{
            id
        }
    })
    return deletedAdmin
};


export const forgotPasswordLink = async(email: string, link: string| undefined, passwordResetLink: string | undefined)=>{
    if(!(await fetchAdminByEmail(email) )){
       throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
    }else{
         //sign the token with jwt
         const token = signToken({ id: email, role:'admin' });
          // Generate a hashed resetLink
          const hashedResetLink = await hash(passwordResetLink || "null");
         // Update the reset token and hashed reset link in the admin table
         await prisma.admin.update({
             where: {
                 email: email
             },
             data: { 
                 passwordResetToken: token,  // this token will be used to verify the reset link in the frontend
                 hashedResetLink: hashedResetLink 

             },
         });
 
         // Send email with password reset link
         await sendPasswordResetLink(email, link,hashedResetLink)

         return {token}

    }
}

 
export const resetPassword = async(newPassword: string, token: string)=>{
    try {
        if(!newPassword || !token){
           throwError(HttpStatus.BAD_REQUEST, "Missing required fields ");
        }else{
            const findToken =  await prisma.admin.findFirst({
                where:{
                    passwordResetToken: token
                }
            })
            if(!findToken){
               throwError(HttpStatus.UNAUTHORIZED, "Invalid token")
            }else{
                const hashedPassword = await hash(newPassword)
                if(!hashedPassword){
                   throwError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Error hashing password"
                      );
                }else{
                    await prisma.admin.update({
                        where: {
                            passwordResetToken: token
                        },
                        data: { 
                            password: hashedPassword,
                            passwordResetToken: null,
                            hashedResetLink: null,
                            otp: null                      
                         },
                    });
                    return "Password reset successful"
                }
            }
        }
        
 
    } catch (error) {
       throwError(HttpStatus.INTERNAL_SERVER_ERROR, "Error reseting password");
      
    }

  };
  