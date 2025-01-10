import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { studentData, studentSchema } from "../validators/studentValidator";
import { student } from "@prisma/client";
import { generateReferallCode, generateStudentIndex } from "../utils/referralCodeGenerator";


export const registerStudent = async(data: studentData, picture:{photoUrl: string, photoKey: string})=>{
    const validateStudentData = studentSchema.safeParse(data)
    if(!validateStudentData.success){
        const errors = validateStudentData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const studentIndex = await generateStudentIndex()

        const findStudent = await prisma.student.findUnique({
            where: {
                studentId: studentIndex
            }
        })
        if(!findStudent){
            const findClass = await prisma.classes.findUnique({
            where: { id: data.classId },
          });
        
          if (!findClass) {
            throw new HttpException(HttpStatus.NOT_FOUND, `Class with id ${data.classId} not found`);
          }else{
            const generatedPassword = await generateReferallCode()
            const newStudent = await prisma.student.create({
                data:{
                    firstName: data.firstName,
                    lastName: data.lastName,
                    otherName: data.otherName,
                    gender: data.gender,
                    photoUrl: picture.photoUrl,
                    photoKey: picture.photoKey,
                    studentId: studentIndex,
                    password: generatedPassword,
                    classId: data.classId,
                    del_flag: false
                }
            })
            const {password, ...studentWithoutPassword} = newStudent
            return studentWithoutPassword
            
          }
           
        }else{
            throw new HttpException(HttpStatus.CONFLICT, "Student with this Index already exists")
        }
    }
    
};
