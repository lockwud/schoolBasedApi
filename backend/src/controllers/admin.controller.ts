import { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service"
import { HttpStatus } from "../utils/http-status";
import { adminData } from '../validators/adminValidator';
import { catchAsync } from '../utils/catchAsync';

export const signUp = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const data = req.body satisfies adminData
        const  { id }   = req.params;
        const addAdmin = await adminService.registerAdmin(id,data)
        res.status(HttpStatus.CREATED).json({addAdmin})
});


export const login = catchAsync(
    async(req: Request, res: Response, next: NextFunction

    )=>{
        const {email, password} = req.body;
        const { id } = req.params;
        const adminLogin = await adminService.signInAdmin(id, email, password)
        res.status(HttpStatus.OK).json({adminLogin})
});


export const verifyOtp = catchAsync(
    async(req: Request, res: Response, next: NextFunction

    )=>{
        const {email, otp} = req.body;
        const { id } = req.params;
        const verifiedAdmin = await adminService.verifyOtp(id, email, otp)
        res.status(HttpStatus.OK).json({verifiedAdmin})
});


export const sendPasswordResetLink = catchAsync(
    async(req: Request, res: Response, next: NextFunction
    )=>{
        const {email} = req.body;
        const { id } = req.params;
        const resetLink = await adminService.sendPasswordResetLink(id, email)
        res.status(HttpStatus.OK).json({resetLink})
}
);


export const resetPassword = catchAsync(
    async(req: Request, res: Response, next: NextFunction
    )=>{
        const {email, password} = req.body;
        const { id } = req.params;
        const resetPassword = await adminService.resetPassword(id, email, password)
        res.status(HttpStatus.OK).json({resetPassword})
    }
);


export const getAdmins = catchAsync(
    async(req: Request, res: Response, next: NextFunction

    )=>{
        const { id } = req.params;
        const admins = await adminService.fetchAdmins(id)
        res.status(HttpStatus.OK).json(admins)
    
});


export const getAdminById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { schoolId, id } = req.params;
        const fetchedAdmin = await adminService.fetchAdminById(schoolId, id)
        res.status(HttpStatus.OK).json(fetchedAdmin)

});


export const updateAdminRecords = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { schoolId, id } = req.params;
        const  data  = req.body;
        const updatedRecord = await adminService.updateAdmin(schoolId, id, data)
        res.status(HttpStatus.OK).json(updatedRecord)
   
});


export const deleteAdmin = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { schoolId, id } = req.params;
        const deletedAdmin = await adminService.deleteAdmin(schoolId, id)
        res.status(HttpStatus.OK).json({ message: "Admin deleted successfully"});

});




