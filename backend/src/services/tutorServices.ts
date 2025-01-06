import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { sendPasswordResetLink } from "../utils/emailTransporter"
import { tutorData, tutorSchema } from "../validators/tutorValidator";
import { tutor } from "@prisma/client";

export const addTtutor = async(data: tutorData)=>{
    const validateTutorData = tutorSchema.safeParse(data)
    if(!validateTutorData.success){
        const errors = validateTutorData.error.issues.map(
        ({ message, path }) => `${path}: ${message}`
        )
        throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const checkTutorAvailability = await prisma.tutor.findUnique({
            where:{
                email: data.email
            }
        })
        if(!checkTutorAvailability){
            //check registrationCode
            const findAdminRegistrationCode = await prisma.admin.findUnique({
               where:{
                generatedRegistrationCodes: data.registeredCode
               }
            });  
            if(!findAdminRegistrationCode){
                throw new HttpException(HttpStatus.FORBIDDEN, "Invalid registration code")
            }else{
                if (findAdminRegistrationCode.maxUsedCode <= findAdminRegistrationCode.totalCodeUsed) {
                    throw new HttpException(HttpStatus.FORBIDDEN, "Maximum number of codes used");
                  }else{
                    await prisma.admin.update({
                        where:{
                            id: findAdminRegistrationCode.id,
                        },
                        data:{
                            maxUsedCode:{
                                decrement: 1,
                            },
                            totalCodeUsed:{
                                increment: 1,
                            }
                        }
                    })
                    const hashedTutorPassword = await hash(data.password)
                    const savedTutor = await prisma.tutor.create({
                        data:{
                            firstName: data.firstName,
                            lastName: data.lastName,
                            gender: data.gender,
                            email: data.email,
                            password: hashedTutorPassword,
                            contact: data.contact,
                            registeredCode: data.registeredCode
                        }
                    })
                    const {password, ...tutorWithoutPassword} = savedTutor
                    return tutorWithoutPassword

                  }
                  }
               
        }else{
            throw new HttpException(HttpStatus.CONFLICT, "Email already exists")
        }
       
    };
};


export const loginTutor = async(email: string, password: string)=>{
    const findTutor = await prisma.tutor.findUnique({
        where:{
            email
        }
    })
    if(!findTutor){
        throw new HttpException(HttpStatus.NOT_FOUND, "Tutor not found")
    }else{
        const comparePassword = await compare(password, findTutor.password)
        if(!comparePassword){
            throw new HttpException(HttpStatus.FORBIDDEN, "Invalid email or password")
        }else{
            return findTutor
        }
    }
};


export const fetchTutors = async()=>{
    const getAllTutors = await prisma.tutor.findMany()
    return getAllTutors
};


export const fetchTutorById = async(id: string)=>{
    const fetchedTutor = await prisma.tutor.findUnique({
        where:{
            id
        }
    })
    return fetchedTutor
};


export const fetchTtutorByEmail = async(email: string)=>{
    const fetchedTutor = await prisma.tutor.findUnique({
        where:{
            email
        }
    })
    return fetchedTutor
};


export const updateTutor = async(id: string, data: Partial<tutor>)=>{
    const validateTutorData = tutorSchema.safeParse(data)
    if(!validateTutorData.success){
        const errors = validateTutorData.error.issues.map(
        ({ message, path }) => `${path}: ${message}`
        )
        throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const findTutor = await prisma.tutor.findUnique({
            where:{
                id
            }
        })
        if(!findTutor){
            throw new HttpException(HttpStatus.NOT_FOUND, "Tutor not found")
        }else{
            const updatedTutor = await prisma.tutor.update({
                where:{
                    id
                },
                data
            })
            return updatedTutor
        }
    }
};


export const deleteTutor = async(id: string)=>{
    const findTutor = await prisma.tutor.findUnique({
        where:{
            id
        }
    })
    if(!findTutor){
        throw new HttpException(HttpStatus.NOT_FOUND, "Tutor not found")
    }else{
        await prisma.tutor.delete({
            where:{
                id
            }
        })
        return {message: "Tutor deleted successfully"}
    }
};



export const forgotPasswordLink = async (email: string, link: string | undefined, passwordResetLink: string | undefined) => {
    if (!(await fetchTtutorByEmail(email))) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Tutor not found");
    } else {
        // Sign the token with JWT
        const token = signToken({ id: email, role: 'tutor' });
        
        // Generate a hashed resetLink
        const hashedResetLink = await hash(passwordResetLink || "null");

        // Set an expiration time (e.g., 5 minutes from now)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds

        // Update the reset token, hashed reset link, and expiration in the tutor table
        await prisma.tutor.update({
            where: { email },
            data: {
                passwordResetToken: token,
                hashedResetLink: hashedResetLink,
                passwordResetExpiration: expiresAt,
                hashedResetLinkExpired: false,
            }
        });

        // Send email with password reset link
        await sendPasswordResetLink(email, link, hashedResetLink);

        return { token };
    }
};


 
export const resetPassword = async (newPassword: string, token: string) => {
    try {
        if (!newPassword || !token) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Missing required fields ");
        } else {
            const findToken = await prisma.tutor.findFirst({
                where: {
                    passwordResetToken: token,
                    passwordResetExpiration: new Date()
                }
            });

            if (!findToken) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid token");
            } else {
                const hashedPassword = await hash(newPassword);
                
                if (!hashedPassword) {
                    throw new HttpException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Error hashing password"
                    );
                } else {
                    // Update the password and mark reset as completed
                    await prisma.tutor.update({
                        where: { id: findToken.id },
                        data: {
                            password: hashedPassword,
                            passwordResetToken: null,
                            hashedResetLink: null,
                            passwordResetCompleted: true,
                            hashedResetLinkExpired: true
                        },
                    });
                    return "Password reset successful";
                }
            }
        }
    } catch (error) {
        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error resetting password");
    }
};
