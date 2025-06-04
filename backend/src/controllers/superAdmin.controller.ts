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
    const verifiedSuperadmin = await superAdminService.verifySuperAdminOtp(email, otp)
    res.status(HttpStatus.OK).json({verifiedSuperadmin})    
});


export const registerSchool = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const data = req.body
    const school = await superAdminService.onboardSchool(data)
    res.status(HttpStatus.CREATED).json({message:"Onboarding successful", school})
})


export const getAllSchools = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const AllSchools = await superAdminService.fetchSchools()
    res.status(HttpStatus.OK).json({AllSchools})
})