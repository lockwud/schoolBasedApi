import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as tutorService from "../services/tutorServices"
import { HttpStatus } from "../utils/http-status";
// import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { tutorData } from '../validators/tutorValidator';

export const signUp = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = req.body satisfies tutorData
        const addTutor = await tutorService.addTtutor(data)
        res.status(HttpStatus.CREATED).json(addTutor)
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
