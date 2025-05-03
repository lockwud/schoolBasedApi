import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as attendanceService from "../services/attendance.service";
import { HttpStatus } from "../utils/http-status";


export const createAttendance = catchAsync(async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const data = req.body
    const result = await attendanceService.createAttendance(data);
    res.status(HttpStatus.CREATED).json(result);
});


export const getAttendanceRecords = catchAsync(async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const allAttendances = await attendanceService.fetchAttendanceRecords();
    res.status(HttpStatus.OK).json(allAttendances);
});