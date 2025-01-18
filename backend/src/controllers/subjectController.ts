import { subject } from './../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d';
import { ErrorResponse } from './../utils/types';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/http-error";
import * as subjectService from "../services/subjectService"
import { subjectData } from '../validators/subjectValidator';
import { HttpStatus } from '../utils/http-status';
import { catchAsync } from '../utils/catchAsync';


export const saveSubject = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const data = req.body satisfies subjectData
        const addedsubject = await subjectService.addSubject(data)
        res.status(HttpStatus.CREATED).json(addedsubject)

});


export const tutorsSubject = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const {lastName, subject} = req.body
        const assignedTutor = await subjectService.assignSubjectToTutors(lastName,subject)
        res.status(HttpStatus.ACCEPTED).json({message: `Mr. ${assignedTutor.lastName}has been assigned to teach ${subject}`})

});


export const getSubjects = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const subjects = await subjectService.fetchSubjects()
        res.status(HttpStatus.OK).json(subjects)

});


export const getSubjectsByName = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const {subjectName} = req.body
        const fetchedSubject = await subjectService.fetchSubjectByName(subjectName)
        res.status(HttpStatus.OK).json(fetchedSubject)
 
});


export const getSubjectTutors = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const {subjectName} = req.body
        const subjectTutors = await subjectService.fetchSubjectTutors(subjectName)
        res.status(HttpStatus.OK).json({subjectTutors})

});


export const updateTutorSubject = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
        const {subjectName, tutorName} = req.body
        const updated = await subjectService.updateSubjectTutor(subjectName, tutorName)
        res.status(HttpStatus.OK).json({message:`Mr. ${updated.lastName}, has been assigned to teach ${subjectName}`})

});

