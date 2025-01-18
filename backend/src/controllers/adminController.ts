import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as adminService from "../services/adminServices"
import { HttpStatus } from "../utils/http-status";
import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { adminData } from '../validators/adminValidator';
import { catchAsync } from '../utils/catchAsync';

export const signUp = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const data = req.body satisfies adminData
        const addAdmin = await adminService.registerAdmin(data)
        res.status(HttpStatus.CREATED).json({addAdmin})
});


export const login = catchAsync(
    async(req: Request, res: Response, next: NextFunction

    )=>{
        const {email, password} = req.body;
        const adminLogin = await adminService.signInAdmin(email, password)
        const otp = generateOtp();
        
        await adminService.updateAdmin(adminLogin!.id, {otp,})
        await sendOtpEmail(email, otp)
        res.status(HttpStatus.OK).json({message: "check your email for otp"})
});


export const getAdmins = catchAsync(
    async(req: Request, res: Response, next: NextFunction

    )=>{
        const admins = await adminService.fetchAllAdmins()
        res.status(HttpStatus.OK).json(admins)
    
});


export const getAdminByEmail = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { email } = req.body
        const fetchedAdmin = await adminService.fetchAdminByEmail(email)
        res.status(HttpStatus.OK).json(fetchedAdmin)

});


export const getAdminById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params;
        const fetchedAdmin = await adminService.fetchAdminById(id)
        res.status(HttpStatus.OK).json(fetchedAdmin)

});


export const updateAdminRecords = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params;
        const { data } = req.body;
        const updatedRecord = await adminService.updateAdmin(id, data)
        res.status(HttpStatus.OK).json(updatedRecord)
   
});


export const deleteAdmin = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params;
        const deletedAdmin = await adminService.deleteAdminRecords(id)
        res.status(HttpStatus.OK).json(deletedAdmin)

});


export const otpVerification = catchAsync(async(
    req: Request, res: Response, next: NextFunction
)=>{
        const {email,otp} = req.body
        const token = await adminService.verifyOtp(email, otp)
        res.status(HttpStatus.OK).json({message:"verified",token})
   
});


export const forgotPassword = catchAsync(async(
    req: Request, res: Response, next: NextFunction
)=>{
        const { email } = req.body;
        const passwordResetLink = process.env.PASSWORD_RESET_URL
        const link = await process.env.PASSWORD_RESET_URL// generate password reset link
        const token = await adminService.forgotPasswordLink(email,link,passwordResetLink)
        res.status(HttpStatus.OK).json({message: "check email for reset link", token})
   
});


export const resetPassword = catchAsync(async(
    req: Request, res: Response, next: NextFunction
)=>{
        const {password} = req.body
        const {token} = req.params
        await adminService.resetPassword(password, token)
        res.status(HttpStatus.OK).json("password reset successfully")
 
});


