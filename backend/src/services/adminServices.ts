import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { adminData, adminSchema } from "../validators/adminValidator";
import { signToken } from "../utils/jsonwebtoken";

export const registerAdmin = async(data: adminData)=>{
    const validateAdminData = adminSchema.safeParse(data)
    if(!validateAdminData.success){
        const errors = validateAdminData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
          );
          throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));

    }else{
        const checkAdminAvailability = await prisma.admin.findUnique({
            where:{
                email: data.email
            }
        })
        if(!checkAdminAvailability){
            const HashedAdminPassword = await hash(data.password)
            const saveAdmin = await prisma.admin.create({
                data:{
                    ...data,
                    password: HashedAdminPassword
                }
            })
            const {password, ...adminDataWithoutPassword} = saveAdmin
            return adminDataWithoutPassword
            
        }else{
            throw new HttpException(HttpStatus.CONFLICT, "Admin already exist")
    
        }

    }

};

export const signInAdmin = async(email: string, password: string)=>{
    const findAdmin = await prisma.admin.findUnique({where: {email}})
    if(!findAdmin){
        throw new HttpException(HttpStatus.NOT_FOUND, "Admin does not exist")

    }else{
        const verifiedPassword = await compare(password, findAdmin.password)
        if(!verifiedPassword){
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid email or password")
        }else{
            return findAdmin
        }

    }
}

export const verifyOtp = async (id: string, otp: string) => {
    const admin = await prisma.admin.findFirst({ where: { id } });
  
    if (!admin) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid OTP or Student not found");
    }
  
    // Check if the OTP matches
    if (admin.otp !== otp) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid OTP");
    }
  
    // Generate a JWT token if OTP is correct
    const token = signToken({ id: admin.id,role:'admin' });
  
    // Clear the OTP from the database after successful verification
    await prisma.admin.update({
        where: {
            id: admin.id
        },
        data: { otp: null },
        
    });
  
    return token;
  };