import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as tutorService from "../services/tutorServices"
import { HttpStatus } from "../utils/http-status";
// import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { tutorData } from '../validators/tutorValidator';
import { generateOtp, sendOtpEmail } from '../utils/emailTransporter';

export const signUp = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = req.body satisfies tutorData
        const addTutor = await tutorService.addTutor(data)
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


export const login = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const {email, password} = req.body
        const tutorLogin = await tutorService.signIn(email, password)
        const otp = generateOtp();
        await tutorService.updateTutor(tutorLogin.id, {otp,})
        await sendOtpEmail(email, otp)
        res.status(HttpStatus.OK).json({message:"check your email for otp"})
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


export const getTutors = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const tutors = await tutorService.fetchTutors()
        res.status(HttpStatus.OK).json(tutors)
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


export const getTtutorById = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { id } = req.params
        const fetchedTutor = await tutorService.fetchTutorById(id)
        res.status(HttpStatus.OK).json({fetchedTutor})
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


export const getTutorByEmail = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { email } = req.body
        const fetchedTutor = await tutorService.fetchTutorByEmail(email)
        res.status(HttpStatus.OK).json({fetchedTutor})
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


export const updateTutorDetails = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { id } = req.params
        const { data } = req.body
        const updatedTutor = await tutorService.updateTutor(id, data)
        res.status(HttpStatus.OK).json(updatedTutor)
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


export const deleteTutor = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { id } = req.params
        const deletedTutor = await tutorService.deleteTutor(id)
        res.status(HttpStatus.OK).json(deletedTutor)
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


export const sendPasswordResetLink = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { email } = req.body
        const passwordResetLink = process.env.PASSWORD_RESET_URL
        const link = await process.env.PASSWORD_RESET_URL// generate password reset link
        const token = await tutorService.forgotPasswordLink(email,link,passwordResetLink)
        res.status(HttpStatus.OK).json({message: 'Password reset link sent', token})
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


export const resetPassword = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { password } = req.body
        const { token } = req.params
        const fetchedTutor = await tutorService.resetPassword(password, token)
        res.status(HttpStatus.OK).json({message: 'Password reset successful'})
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



export const otpVerification = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const { otp } = req.body
        const { email } = req.params
        const token = await tutorService.verifyOtp(otp, email)
        res.status(HttpStatus.OK).json({message: 'OTP verified', token})
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


export const deleteTutorRecords = async(
    req: Request, 
    res: Response, 
    next: NextFunction
    
)=>{
    try{
        const { id } = req.params
        const deletedTutorRecords = await tutorService.deleteTutor(id)
        res.status(HttpStatus.OK).json(deletedTutorRecords)
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
