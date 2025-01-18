import HttpException from "../utils/http-error";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import { studentAnalytics, totalPopulationAnalytics, tutorAnalytics } from "../services/analyticsService";
import { catchAsync } from "../utils/catchAsync";


export const fetchTotalStudents = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    const totalStudents = await studentAnalytics.getTotalStudents()
    res.status(HttpStatus.OK).json({totalStudents})
   
});


export const fetchStudentsByGender = catchAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const { gender } = req.query;
         if (typeof gender !== "string" || !["male", "female"].includes(gender)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Invalid gender. Expected 'male' or 'female'.",
            });
        }
        const countByGender = await studentAnalytics.getStudentsByGender(gender as "male" | "female");
        res.status(HttpStatus.OK).json({ countByGender });
   
});


export const fetchTopPerformingStudent = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const topTenStudents = await studentAnalytics.getTopPerformingStudentsFromClass()
        res.status(HttpStatus.OK).json(topTenStudents)

});


export const fetchTotalTutors = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const totalTutors = await tutorAnalytics.getTotalTutors()
        res.status(HttpStatus.OK).json(totalTutors)
  
});


export const fetchTotalPopulation = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const entirePopulation = await totalPopulationAnalytics.Population()
        res.status(HttpStatus.OK).json(entirePopulation)

});