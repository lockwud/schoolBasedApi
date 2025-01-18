import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as tutorService from "../services/tutorServices"
import { HttpStatus } from "../utils/http-status";
// import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { tutorData } from '../validators/tutorValidator';
import { generateOtp, sendOtpEmail } from '../utils/emailTransporter';
import { catchAsync } from '../utils/catchAsync';

export const signUp = catchAsync(async(
    req: Request, res: Response, next: NextFunction
)=>{
        const data = req.body satisfies tutorData
        const addTutor = await tutorService.addTutor(data)
        res.status(HttpStatus.CREATED).json(addTutor)

});


export const login = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const {email, password} = req.body
        const tutorLogin = await tutorService.signIn(email, password)
        const otp = generateOtp();
        await tutorService.updateTutor(tutorLogin!.id, {otp,})
        await sendOtpEmail(email, otp)
 
});


export const getTutors = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const tutors = await tutorService.fetchTutors()
        res.status(HttpStatus.OK).json(tutors)
  
});


export const getTtutorById = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { id } = req.params
        const fetchedTutor = await tutorService.fetchTutorById(id)
        res.status(HttpStatus.OK).json(fetchedTutor)
   
});


export const getTutorByEmail = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { email } = req.body
        const fetchedTutor = await tutorService.fetchTutorByEmail(email)
   
});


export const updateTutorDetails = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { id } = req.params
        const { data } = req.body
        const updatedTutor = await tutorService.updateTutor(id, data)
        res.status(HttpStatus.OK).json(updatedTutor)
   
});


export const deleteTutor = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { id } = req.params
        const deletedTutor = await tutorService.deleteTutor(id)
        res.status(HttpStatus.OK).json({message: "Tutor deleted", deletedTutor})
   
});


export const sendPasswordResetLink = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { email } = req.body
        const passwordResetLink = process.env.PASSWORD_RESET_URL
        const link = await process.env.PASSWORD_RESET_URL// generate password reset link
        const token = await tutorService.forgotPasswordLink(email,link,passwordResetLink)
        res.status(HttpStatus.OK).json({message: 'Password reset link sent', token})
   
});


export const resetPassword = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { password } = req.body
        const { token } = req.params
        const fetchedTutor = await tutorService.resetPassword(password, token)
        res.status(HttpStatus.OK).json({message: 'Password reset successful'})
  
});



export const otpVerification = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const { email, otp } = req.body
        const token = await tutorService.verifyOtp(email, otp)
        res.status(HttpStatus.OK).json({message: 'OTP verified', token})
  
});


export const deleteTutorRecords = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
    
)=>{
        const { id } = req.params
        const deletedTutorRecords = await tutorService.deleteTutor(id)
        res.status(HttpStatus.OK).json(deletedTutorRecords)
   
});
