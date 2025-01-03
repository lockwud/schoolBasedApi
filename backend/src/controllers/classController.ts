import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as classService from "../services/classServices"
import { HttpStatus } from "../utils/http-status";
import { classData } from '../validators/classValidator';


export const registerClass = async(
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const data = req.body satisfies classData
        const addClass = await classService.addClass(data)
        res.status(HttpStatus.OK).json(addClass)

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


export const getClasses = async(
    req:Request, 
    res: Response, 
    next: NextFunction
)=>{
    try{
        const fetchedClass = await classService.fetchClasses()
        res.status(HttpStatus.OK).json(fetchedClass)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }

};


export const getClassById = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params
        const fetchedClass = await classService.fetchClassById(id)
        res.status(HttpStatus.OK).json({fetchedClass})

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const getClassByName = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {className} = req.body
        const fetchedClass = await classService.fetchClassByName(className)
        res.status(HttpStatus.OK).json(fetchedClass)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const updateClassDetails = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params;
        const { data } = req.body;
        const updatedDetails = await classService.updateClassDetails(id, data)
        res.status(HttpStatus.OK).json(updatedDetails)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};


export const deleteClass = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { id } = req.params;
        const deletedClass = await classService.deleteClass(id)
        res.status(HttpStatus.OK).json(deletedClass)

    }catch(error){
        const err = error as ErrorResponse;
        next(
            new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                err.message
            )
        )
    }
};