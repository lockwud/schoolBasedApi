import { classes } from "@prisma/client";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { classData, classSchema } from "../validators/classValidator";


export const addClass = async(data: classData)=>{
    const validateClassData = classSchema.safeParse(data)
    if(!validateClassData.success){
        const errors = validateClassData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
          );
          throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkClassAvailability = await prisma.classes.findFirst({
            where:{
                className: data.className
            }
        })
        if(!checkClassAvailability){
            
            const saveClassInfo = await prisma.classes.create({
                data:{
                    className: data.className,
                    capacity: parseInt(data.capacity)
                }
            })
            return saveClassInfo

        }else{
            throw new HttpException(HttpStatus.CONFLICT, "Class already registered")
        }
    }
};


export const fetchClasses = async() =>{
    const getAllClases = await prisma.classes.findMany()
    return getAllClases
}


export const fetchClassById = async(id: string)=>{
    const fetchedClass = await prisma.classes.findUnique({
        where:{
            id
        }
    })
    return fetchedClass
};


export const fetchClassByName = async(className: string)=>{
    const fetchedClass = await prisma.classes.findFirst({
        where: {
            className
        }
    })
    return fetchedClass
};


export const updateClassDetails = async(id: string, data: Partial <classes>)=>{
    if(!await fetchClassById(id)){
        throw new HttpException(HttpStatus.NOT_FOUND, "Class not found")
    }else{
        const updatedClassDetails = await prisma.classes.update({
            where: {
                id
            },
            data: {
                ...data
            }
        })
        return updatedClassDetails
    }
};


export const deleteClass = async(id: string)=>{
    const deletedClass = await prisma.classes.delete({
        where: {
            id
        }
    })
    return deletedClass
};