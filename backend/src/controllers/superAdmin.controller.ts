import {Request, Response, NextFunction} from "express"
import { HttpStatus } from "../utils/http-status"
import { catchAsync } from "../utils/catchAsync"
import { phoneValidator, checkMobileNetwork } from "../utils/phone.check"
import * as superAdminService from "../services/superAdmin.service"

export const signUpSuperAdmin = catchAsync(async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const data = req.body
    const { phone } = data
    const validatedPhone = await phoneValidator(phone);
    await checkMobileNetwork(validatedPhone!);
    data.phone = validatedPhone
    const superAdmin = await superAdminService.createSuperAdmin(data);
    res.status(HttpStatus.CREATED).json(superAdmin);
});


export const signIn = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    const {email, password} = req.body
    const login = await superAdminService.loginSuperAdmin(email, password)
    res.status(HttpStatus.ACCEPTED).json({login})

});


export const verifyOtp = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const {email, otp} = req.body
    const verifyOtp = await superAdminService.verifyOtpSuperAdmin(email, otp)
    res.status(HttpStatus.OK).json({verifyOtp})
});


export const changePassword = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const {email, password} = req.body
    const newPassword = await superAdminService.resetPasswordSuperAdmin(email, password)
    res.status(HttpStatus.OK).json({newPassword})
});


export const sendLink = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const {email} = req.body
    const link = await superAdminService.sendResetLink(email)
    res.status(HttpStatus.OK).json({message: "Link sent successfully"})
});

