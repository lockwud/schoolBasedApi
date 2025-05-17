import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { adminData, adminSchema } from "../validators/adminValidator";
import { generateOtp, sendOtpEmail} from "../utils/emailTransporter"
import { generateReferallCode } from "../utils/referralCodeGenerator";
import { throwError } from "../middleware/errorHandler";
import { admin } from "@prisma/client";
import { signToken } from "../utils/jsonwebtoken";

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
        const registrationCode = await generateReferallCode();

        // Save admin to the database
        const saveAdmin = await prisma.admin.create({
            data: {
                ...data,
                tutorRegistrationCode: registrationCode,
                password: HashedAdminPassword,
                
            },
        });

        const token = signToken({ id: saveAdmin.id, role: "admin" });
        const { password, ...adminDataWithoutPassword } = saveAdmin;
        return { adminDataWithoutPassword };
    } else {
        throwError(HttpStatus.CONFLICT, "Admin already exists");
    }
};


export const signInAdmin = async (email: string, password: string) => {
    const findAdmin = await prisma.admin.findUnique({ where: { email } });
    if (!findAdmin) {
      throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
    }
  
    const verifyPassword = await compare(password, findAdmin?.password!);
    if (!verifyPassword) {
      throwError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }
  
    const otp = await generateOtp();
    await sendOtpEmail(email, otp);
  
    await prisma.admin.update({
      where: { email },
      data: { otp },
    });
  
    return { message: "OTP sent to your email. Please verify to continue." };
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


export const forgotPassword = async(email: string)=>{
    if(!(await fetchAdminByEmail(email) )){
       throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
    }else{
        const otp = await generateOtp();
        await sendOtpEmail(email, otp)
        await prisma.admin.update({
            where:{
                email
            },
            data:{
                otp,
            }
        })
        setTimeout(async()=>{
            await prisma.admin.update({
                where:{
                    email
                },
                data:{
                    otp: null
                }
            })
        }
        , 300000)
        return {message: "Check your email for otp"}

    }
}

export const verifyOtp = async(email: string, otp: string)=>{
    const findAdmin = await prisma.admin.findUnique({where: {email}})
    if(!findAdmin){
       throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
    }else{
        if(findAdmin.otp === otp){
            const token = signToken({ id: findAdmin.id, role: "admin" });
            await prisma.admin.update({
                where:{
                    email
                },
                data:{
                    otp: null,
                    token: token
                }
            })

            return {token}
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
    }
}

 
export const resetPassword = async (newPassword: string, token: string) => {
    // Find the user by token
    const admin = await prisma.admin.findFirst({ where: { token } });
    if (!admin) {
      throwError(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
    }
  
    const hashedPassword = await hash(newPassword);
  
    await prisma.admin.update({
      where: { id: admin?.id! },
      data: {
        password: hashedPassword,
        token: null, 
      },
    });
  
    return { message: "Password reset successfully"};
  };