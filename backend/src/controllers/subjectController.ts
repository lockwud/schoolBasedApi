import { subject } from './../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d';
import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as subjectService from "../services/subjectService"
import { subjectData } from '../validators/subjectValidator';
import { HttpStatus } from '../utils/http-status';


export const saveSubject = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const data = req.body satisfies subjectData
        const addedsubject = await subjectService.addSubject(data)
        res.status(HttpStatus.CREATED).json(addedsubject)

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


export const tutorsSubject = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {lastName, subject} = req.body
        const assignedTutor = await subjectService.assignSubjectToTutors(lastName,subject)
        res.status(HttpStatus.ACCEPTED).json({message: `Mr. ${assignedTutor.lastName}has been assigned to teach ${subject}`})

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


export const getSubjects = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const subjects = await subjectService.fetchSubjects()
        res.status(HttpStatus.OK).json(subjects)

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


export const getSubjectsByName = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {subjectName} = req.body
        const fetchedSubject = await subjectService.fetchSubjectByName(subjectName)
        res.status(HttpStatus.OK).json({fetchedSubject})

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


export const getSubjectTutors = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {subjectName} = req.body
        const subjectTutors = await subjectService.fetchSubjectTutors(subjectName)
        res.status(HttpStatus.OK).json({subjectTutors})


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


export const updateTutorSubject = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {subjectName, tutorName} = req.body
        const updated = await subjectService.updateSubjectTutor(subjectName, tutorName)
        res.status(HttpStatus.OK).json({message:`Mr. ${updated.lastName}, has been assigned to teach ${subjectName}`})


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

