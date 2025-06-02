import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/superClient";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { generateOtp, sendOtpEmail, sendPasswordResetLink } from "../utils/emailTransporter"
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
        if(!isValidPassword){
            throwError(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
           const otp = await generateOtp();
            await sendOtpEmail(email, otp);

           await prisma.superAdmin.update({
            where: { email },
            data: { otp },

           })
           setTimeout(async () => {
            await prisma.superAdmin.update({
                where: { email },
                data: { otp: null },
            });
           }, 5 * 60 * 1000);
           return {message: "Check your email for otp"};
    }
};


export const verifySuperAdminOtp = async(email: string, otp: string)=>{
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

