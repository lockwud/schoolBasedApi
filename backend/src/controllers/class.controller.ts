import { ErrorResponse } from '../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as classService from "../services/class.service"
import { HttpStatus } from "../utils/http-status";
import { classData } from '../validators/classValidator';
import { catchAsync } from '../utils/catchAsync';


export const registerClass = catchAsync(async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
        const data = req.body satisfies classData
        const addClass = await classService.addClass(data)
        res.status(HttpStatus.OK).json(addClass)

});


export const getClasses = catchAsync(async(
    req:Request, 
    res: Response, 
    next: NextFunction
)=>{
        const fetchedClass = await classService.fetchClasses()
        res.status(HttpStatus.OK).json(fetchedClass)

});


export const getClassById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params
        const fetchedClass = await classService.fetchClassById(id)
        res.status(HttpStatus.OK).json({fetchedClass})
    
});


export const getClassByName = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const {className} = req.body
        const fetchedClass = await classService.fetchClassByName(className)
        res.status(HttpStatus.OK).json(fetchedClass)

});


export const updateClassDetails = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params;
        const { data } = req.body;
        const updatedDetails = await classService.updateClassDetails(id, data)
        res.status(HttpStatus.OK).json(updatedDetails)

});


export const deleteClass = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const { id } = req.params;
        const deletedClass = await classService.deleteClass(id)
        res.status(HttpStatus.OK).json(deletedClass)
  
});