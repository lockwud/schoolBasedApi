import { updateClassDetails } from './../controllers/classController';
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import { subjectSchema, subjectData } from "../validators/subjectValidator";
import prisma from "../utils/prisma";

export const addSubject = async(data: subjectData)=>{
    const validateSubjectData = subjectSchema.safeParse(data)
    if(!validateSubjectData.success){
        const errors = validateSubjectData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
          );
          throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkSubjectAvailability = await prisma.subject.findUnique({
            where:{
                subjectName: data.subjectName
            }
        })
        if(!checkSubjectAvailability){
            const subject = await prisma.subject.create({
                data:{
                    subjectName: data.subjectName
                }
            })
            return subject
        }else{
            throw new HttpException(HttpStatus.CONFLICT, "Subject already created")
        }
    }
};


export const assignSubjectToTutors = async (tutorsName: string, subject: string) => {
    const findTutor = await prisma.tutor.findFirst({
        where: {
            lastName: tutorsName,
        },
    });

    if (!findTutor) {
        throw new HttpException(HttpStatus.NOT_FOUND, "No tutor found");
    }

    const findSubject = await prisma.subject.findUnique({
        where: {
            subjectName: subject,
        },
        include: {
            tutors: true, 
        },
    });

    if (!findSubject) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Subject not found");
    }

    // Check if the tutor is already assigned to the subject
    const isAlreadyAssigned = findSubject.tutors.some(
        (tutor) => tutor.id === findTutor.id
    );

    if (isAlreadyAssigned) {
        throw new HttpException(
            HttpStatus.CONFLICT,
            "Tutor is already assigned to this subject"
        );
    }

    // Assign the subject to the tutor
    const updatedTutor = await prisma.tutor.update({
        where: {
            id: findTutor.id,
        },
        data: {
            subject: {
                connect: { id: findSubject.id },
            },
        },
    });

    return updatedTutor;
};


export const fetchSubjects = async()=>{
    const allSubject = await prisma.subject.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
    return allSubject
} ;


export const fetchSubjectByName = async(subjectName: string)=>{
    const fetchedSubject = await prisma.subject.findUnique({
        where:{
            subjectName
        },
        include:{
            tutors: true
        }
    })
    return fetchedSubject
};


export const fetchSubjectTutors = async(subjectName: string)=>{
    const subjectTutors = await prisma.subject.findUnique({
        where:{
            subjectName
        },
        select:{
            tutors: true
        }
    })
    return subjectTutors
};


export const updateSubjectTutor = async (subjectName: string, tutorName: string) => {
    const findSubject = await prisma.subject.findUnique({
        where: {
            subjectName: subjectName,
        },
    });

    const findTutor = await prisma.tutor.findFirst({
        where: {
            lastName: tutorName,
        },
    });

    if (!findSubject || !findTutor) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Subject or tutor not found");
    }

    const updatedTutor = await prisma.tutor.update({
        where: {
            id: findTutor.id,
        },
        data: {
            subject: {
                connect: { id: findSubject.id }, 
            },
        },
    });

    return updatedTutor;
};
