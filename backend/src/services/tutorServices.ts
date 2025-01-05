import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { admin } from "@prisma/client";
import { sendPasswordResetLink } from "../utils/emailTransporter"
import { tutorData, tutorSchema } from "../validators/tutorValidator";

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
                    throw new HttpException(HttpStatus.FORBIDDEN, "Maximum number of codes used. Please generate a new code.");
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
