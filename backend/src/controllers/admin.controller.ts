import { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service"
import { HttpStatus } from "../utils/http-status";
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
      
        const forgotPassword = await adminService.forgotPassword(email)
        res.status(HttpStatus.OK).json({message: "check email for otp"})
   
});


export const resetPassword = catchAsync(async(
    req: Request, res: Response, next: NextFunction
)=>{
        const {password} = req.body
        const {token} = req.params
        await adminService.resetPassword(password, token)
        res.status(HttpStatus.OK).json("password reset successfully")
 
});


