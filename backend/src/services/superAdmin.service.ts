import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { generateOtp, sendPasswordResetLink } from "../utils/emailTransporter"
import { throwError } from "../middleware/errorHandler";
import { superAdminData, superAdminSchema } from "../validators/superAdmin.validator";


export const createSuperAdmin = async(data: superAdminData)=>{
    const validateSuperAdminData = superAdminSchema.safeParse(data)
    if(!validateSuperAdminData.success){
        const errors = validateSuperAdminData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkSuperAdminAvailability = await prisma.superAdmin.findUnique({
            where:{
                email: data.email,
            },
        });

        if(!checkSuperAdminAvailability){
            const hashedPassword = await hash(data.password);
            // Save superAdmin to the database
            const saveSuperAdmin = await prisma.superAdmin.create({
                data: {
                   ...data,
                    password: hashedPassword,
                },
            });

            const signedToken = signToken({ id: saveSuperAdmin.id, role: "superAdmin" });
            const superAdmin = await prisma.superAdmin.update({
                where: {
                    id: saveSuperAdmin.id,
                },
                data: {
                    token: signedToken,
                },
            })
            const { password,...superAdminDataWithoutPassword } = superAdmin;
            return { superAdminDataWithoutPassword };
        }else{
            throwError(HttpStatus.CONFLICT, "Super admin already exists");
        }

    }
};



export const loginSuperAdmin = async(email: string, password: string)=>{
    const findSuperAdmin = await prisma.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        const isValidPassword = await compare(password, findSuperAdmin.password);
        if(isValidPassword){
           const otpCode = generateOtp();
           await prisma.superAdmin.update({
            where: {
                id: findSuperAdmin.id,
            },
            data: {
               otp: otpCode,
            }
           })

           return {message: "Check your email for otp"};
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
    }
};


export const verifyOtpSuperAdmin = async(email: string, otp: string)=>{
    const findSuperAdmin = await prisma.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        if(findSuperAdmin.otp === otp){
            const token = signToken({ id: findSuperAdmin.id, role: "superAdmin" });
            return { superAdmin: findSuperAdmin, token };
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
    }
};


export const fetchSuperAdminByEmail = async(email: string)=>{
    const findSuperAdmin = await prisma.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        const token = signToken({ id: findSuperAdmin.id, role: "superAdmin" });
        return {findSuperAdmin,token}
    }
}

export const resetPasswordSuperAdmin = async(email: string, password: string)=>{
    const findSuperAdmin = await prisma.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        const token = findSuperAdmin.token
        const resetLinkExpiry = findSuperAdmin.resetLinkExpiresAt;

        if(findSuperAdmin.token === token && findSuperAdmin.resetLinkExpiresAt === resetLinkExpiry){
            const hashedPassword = await hash(password);
            await prisma.superAdmin.update({
                where: {
                    id: findSuperAdmin.id,
                },
                data: {
                    password: hashedPassword,
                    passwordResetToken: null,
                    hashedResetLink: null,
                    token: null
                },
            });
            
            return { message: "Password reset successfully"};
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "reset link expired");
        }
    }
};


export const sendResetLink = async(
    email: string
)=>{
   const superAdmin =  await fetchSuperAdminByEmail(email)
    if(!superAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        const link = `${process.env.RESET_PASSWORD_LINK}/${email}`
        const resetToken = superAdmin.token
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in milliseconds
        await prisma.superAdmin.update({
            where: {
                id: superAdmin.findSuperAdmin.id,
            },
            data: {
                passwordResetToken: resetToken,
                hashedResetLink: link,
                resetLinkExpiresAt: expiresAt,
            },
        })
        await sendPasswordResetLink(email, link, resetToken);
        return "Reset link sent successfully"
    }
   
}