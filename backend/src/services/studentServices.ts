import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { signToken, UserPayload } from "../utils/jsonwebtoken";
import { studentData, studentSchema } from "../validators/studentValidator";
import { student } from "@prisma/client";
import { generateReferallCode, generateStudentIndex } from "../utils/referralCodeGenerator";
import { throwError } from "../middleware/errorHandler";


export const registerStudent = async(data: studentData, picture:{photoUrl: string, photoKey: string})=>{
    const validateStudentData = studentSchema.safeParse(data)
    if(!validateStudentData.success){
        const errors = validateStudentData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
           throwError(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const studentIndex = await generateStudentIndex(data.classId)

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
           throwError(HttpStatus.NOT_FOUND, `Class with id ${data.classId} not found`);
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
           throwError(HttpStatus.CONFLICT, "Student with this Index already exists")
        }
    }
    
};


export const fetchStudents = async()=>{
    const retrievedStudent = await prisma.student.findMany({
        orderBy:{
            studentId: 'desc'
        }
    })
    return retrievedStudent
};


export const fetchStudentById = async(studentId: string)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    return findStudent
};


export const fetchStudentByClass = async(className: string)=>{
    const findClass = await prisma.classes.findFirst({
        where: {
            className
        }
    })

    if(!findClass){
       throwError(HttpStatus.NOT_FOUND, `Class  name ${className} not found`)
    }else{
        const retrievedStudent = await prisma.student.findMany({
            where: {
                classId: findClass.id
            },
            orderBy:{
                studentId: 'desc'
            }
        })
        return retrievedStudent
    }
};


export const updateStudentDetails = async(studentId: string, data: Partial<student>)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    if(!findStudent){
       throwError(HttpStatus.NOT_FOUND, `Student with id ${studentId} not found`)
    }else{
        const updatedStudentDetails = await prisma.student.update({
            where: {
                studentId
            },
            data: {
               ...data
            }
        })
        return updatedStudentDetails
    }
};


export const deleteStudents = async(studentId: string)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    if(!findStudent){
       throwError(HttpStatus.NOT_FOUND, `Student with id ${studentId} not found`)
    }else{
        const deletedStudent = await prisma.student.delete({
            where: {
                studentId
            }
        })
        return deletedStudent
    }

};


export const automaticRemovalOfStudent = async () => {
    const currentDate = new Date();

    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));

    // Find the student who has been absent for the last 6 months
    const findStudent = await prisma.student.findFirst({
        where: {
            del_flag: true,
            attendance: {
                none: {
                    attendanceStatus: 'present', 
                    date: { gte: sixMonthsAgo }, 
                }
            },
        },
        orderBy: {
            createdAt: 'asc', // Pick the student who was created first
        },
    });

    if (findStudent) {
        const deletedStudent = await prisma.student.delete({
            where: {
                id: findStudent.studentId, 
            }
        });
        return deletedStudent;
    } else {
       throwError(HttpStatus.NOT_FOUND, "No student marked for automatic removal based on attendance");
    }
};


export const login = async(studentId: string, password: string)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    if(!findStudent){
       throwError(HttpStatus.NOT_FOUND, "Student not found")
    }else{
        if(password === findStudent.password){
            const tokenPayload: UserPayload = {
                id: findStudent.studentId,
                role: 'student'
            }
            const token = signToken(tokenPayload)
            return {findStudent, token}
        }else{
            const checkPassword = await compare(password, findStudent.password)
            if(checkPassword){
            const tokenPayload: UserPayload = {
                id: findStudent.studentId,
                role: 'student'
            }
            const token = signToken(tokenPayload)
            return {findStudent, token}
        }else{
           throwError(HttpStatus.UNAUTHORIZED, "Invalid password")
        }
     }
    }
};


export const forgotPassword = async(studentId: string)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    if(!findStudent){
       throwError(HttpStatus.NOT_FOUND, "Student not found")
    }else{
        const newPassword = await generateReferallCode()
        const updatedStudentPassword = await prisma.student.update({
            where: {
                studentId
            },
            data: {
                password: newPassword
            }
        })
        return updatedStudentPassword
    }

};


export const changePassword = async(studentId: string, oldPassword: string, password: string)=>{
    const findStudent = await prisma.student.findUnique({
        where: {
            studentId
        }
    })
    if(!findStudent){
       throwError(HttpStatus.NOT_FOUND, "Student not found")
    }else{
        const checkOldPassword = await compare(oldPassword, findStudent.password)
        if(checkOldPassword){
            const newPassword = await hash(password)
            const updatedStudentPassword = await prisma.student.update({
                where: {
                    studentId
                },
                data: {
                    password: newPassword
                }
            })
            return updatedStudentPassword
        }else{
           throwError(HttpStatus.UNAUTHORIZED, "Invalid old password")
        }
    }
};
