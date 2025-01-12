import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as studentService from "../services/studentServices"
import { HttpStatus } from "../utils/http-status";
// import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { studentData } from '../validators/studentValidator';
import cloudinary from '../utils/cloudinary';
// import { generateOtp, sendOtpEmail } from '../utils/emailTransporter';

export const addStudent = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const data = req.body satisfies studentData
        const photo = req.file? req.file.path : undefined;
        const picture = {
            photoUrl: "",
            photoKey: "",
        };
        if(photo){
            const uploaded = await cloudinary.uploader.upload(photo, {
                folder: "students/",
            });
            picture.photoUrl = uploaded.secure_url;
            picture.photoKey = uploaded.public_id;
        }
        const newStudent = await studentService.registerStudent(data, picture)
        res.status(HttpStatus.CREATED).json(newStudent)
    }catch(error){
        const err = error as ErrorResponse
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }

};


export const fetchStudents = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const fetchedStudents = await studentService.fetchStudents()
        res.status(HttpStatus.OK).json(fetchedStudents)
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const fetchStudentById = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { studentId} = req.body;
        const fetchedStudent = await studentService.fetchStudentById(studentId)
        res.status(HttpStatus.OK).json(fetchedStudent)
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const updateStudent = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { studentId} = req.body;
        const data = req.body
       
        const updatedStudent = await studentService.updateStudentDetails(studentId, data)
        res.status(HttpStatus.OK).json(updatedStudent)
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const deleteStudent = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { studentId} = req.body;
        await studentService.deleteStudents(studentId)
        res.status(HttpStatus.NO_CONTENT).json("student record deleted")
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const autoDeleteStudent = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const deleteStudent = await studentService.automaticRemovalOfStudent()
        res.status(HttpStatus.NO_CONTENT).json("student record deleted")
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const requestPassword = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { studentId } = req.body;
        const password = await studentService.forgotPassword(studentId)
        res.status(HttpStatus.OK).json("Go to the administration for your password, \n Kindly change password after getting a password from the admin")
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const updatePassword = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { studentId, oldPassword, password } = req.body;
        await studentService.changePassword(studentId, oldPassword, password)
        res.status(HttpStatus.OK).json("Password reset successfully")
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


