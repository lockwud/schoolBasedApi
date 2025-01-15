import HttpException from "../utils/http-error";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/http-status";
import { ErrorResponse } from "../utils/types";
import { studentAnalytics, totalPopulationAnalytics, tutorAnalytics } from "../services/analyticsService";


export const fetchTotalStudents = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const totalStudents = await studentAnalytics.getTotalStudents()
        res.status(HttpStatus.OK).json({totalStudents})
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


export const fetchStudentsByGender = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { gender } = req.query;
        // Validate the `gender` query parameter
        if (typeof gender !== "string" || !["male", "female"].includes(gender)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Invalid gender. Expected 'male' or 'female'.",
            });
        }

        // Use the validated `gender` value
        const countByGender = await studentAnalytics.getStudentsByGender(gender as "male" | "female");

        res.status(HttpStatus.OK).json({ countByGender });
    } catch (error) {
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        );
    }
};


export const fetchTopPerformingStudent = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const topTenStudents = await studentAnalytics.getTopPerformingStudentsFromClass()
        res.status(HttpStatus.OK).json(topTenStudents)

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


export const fetchTotalTutors = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const totalTutors = await tutorAnalytics.getTotalTutors()
        res.status(HttpStatus.OK).json(totalTutors)
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


export const fetchTotalPopulation = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const entirePopulation = await totalPopulationAnalytics.Population()
        res.status(HttpStatus.OK).json(entirePopulation)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
}