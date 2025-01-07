import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as adminService from "../services/adminServices"
import { HttpStatus } from "../utils/http-status";
import { sendOtpEmail, generateOtp, sendPasswordResetLink  } from "../utils/emailTransporter";
import { adminData } from '../validators/adminValidator';

export const signUp = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = req.body satisfies adminData
        const addAdmin = await adminService.registerAdmin(data)
        res.status(HttpStatus.CREATED).json(addAdmin)
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


export const login = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {email, password} = req.body;
        const adminLogin = await adminService.signInAdmin(email, password)
        const otp = generateOtp();
        
        await adminService.updateAdmin(adminLogin.id, {otp,})
        await sendOtpEmail(email, otp)
        res.status(HttpStatus.OK).json({message: "check your email for otp"})


    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const getAdmins = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const admins = await adminService.fetchAllAdmins()
        res.status(HttpStatus.OK).json(admins)
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 
                err.message
            )
        )
    }
};


export const getAdminByEmail = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { email } = req.body
        const fetchedAdmin = await adminService.fetchAdminByEmail(email)
        res.status(HttpStatus.OK).json(fetchedAdmin)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const getAdminById = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params;
        const fetchedAdmin = await adminService.fetchAdminById(id)
        res.status(HttpStatus.OK).json(fetchedAdmin)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const updateAdminRecords = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params;
        const { data } = req.body;
        const updatedRecord = await adminService.updateAdmin(id, data)
        res.status(HttpStatus.OK).json(updatedRecord)
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const deleteAdmin = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params;
        const deletedAdmin = await adminService.deleteAdminRecords(id)
        res.status(HttpStatus.OK).json(deletedAdmin)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
}


export const otpVerification = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {email,otp} = req.body
        
        const token = await adminService.verifyOtp(email, otp)
        res.status(HttpStatus.OK).json({message:"verified",token})

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 
                err.message
            )
        )
    }
   
};


export const forgotPassword = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const { email } = req.body;
        const passwordResetLink = process.env.PASSWORD_RESET_URL
        const link = await process.env.PASSWORD_RESET_URL// generate password reset link
        const token = await adminService.forgotPasswordLink(email,link,passwordResetLink)
        res.status(HttpStatus.OK).json({message: "check email for reset link", token})
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 
                err.message
            )
        )
    }
};


export const resetPassword = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {password} = req.body
        const {token} = req.params
        await adminService.resetPassword(password, token)
        res.status(HttpStatus.OK).json("password reset successfully")
    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 
                err.message
            )
        )
    }
}


