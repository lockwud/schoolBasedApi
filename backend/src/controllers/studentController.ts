import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as studentService from "../services/studentServices"
import { HttpStatus } from "../utils/http-status";
// import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { studentData } from '../validators/studentValidator';
import cloudinary from '../utils/cloudinary';
// import { generateOtp, sendOtpEmail } from '../utils/emailTransporter';

export const addStudent = async(req: Request, res: Response, next: NextFunction)=>{
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
