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

export const sendPasswordResetLink = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const {email} = req.body
    const resetLink = await superAdminService.sendPasswordResetLink(email)
    res.status(HttpStatus.OK).json({resetLink})
});

export const resetPassword = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const {email, password} = req.body
    const resetPassword = await superAdminService.resetPassword(email, password)
    res.status(HttpStatus.OK).json({resetPassword})
});

export const listSuperAdmins = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const superAdmins = await superAdminService.fetchSuperAdminS()
    res.status(HttpStatus.OK).json({superAdmins})
});

export const getSuperAdminById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params
    const superAdmin = await superAdminService.fetchSuperAdminById(id)
    res.status(HttpStatus.OK).json({superAdmin})
});

export const updateSuperAdmin = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params
    const data = req.body
    const updatedAdmin = await superAdminService.updateSuperAdmin(id, data)
    res.status(HttpStatus.OK).json(updatedAdmin)
})


export const removeSuperAdmin = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params
    const deletedAdmin = await superAdminService.deleteSuperAdmin(id)
    res.status(HttpStatus.OK).json(deletedAdmin)
})




//School
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


export const getSchoolById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params
    const school = await superAdminService.fetchSchoolById(id)
    res.status(HttpStatus.OK).json({school})
});

export const updateSchool = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { id } = req.params
    const data = req.body
    const school = await superAdminService.updateSchool(id, data)
    res.status(HttpStatus.OK).json(school);
});


export const deleteSchools = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { id } = req.params
    const schools = await superAdminService.deleteSchool(id)
    res.status(HttpStatus.OK).json(schools);
});

