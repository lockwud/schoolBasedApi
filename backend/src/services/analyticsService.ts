import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { gender } from '@prisma/client';

export const studentAnalytics = {
    getTotalStudents: async () => {
        const totalStudents = await prisma.student.count();
        return totalStudents;
    },

    getStudentsByGender: async (gender: gender) => {
        const countByGender = await prisma.student.count({
            where: { gender },
        });
        return countByGender;
    },

  
    getTopPerformingStudentsFromClass: async (limit: number = 10) => {
        const classesWithStudents = await prisma.classes.findMany({
            include: {
                student: {
                    include: {
                        studentTerminalReport: {
                            select: {
                                position: true,
                                totalScore: true,
                            },
                        },
                    },
                },
            },
        });
    
        const adjustedResults = classesWithStudents.map((classData) => {
            const allStudents = classData.student;
    
            // Ensure the first position student is included
            const firstPositionStudent = allStudents.find(
                (student) =>
                    student.studentTerminalReport?.some(
                        (report) => report.position === 1
                    )
            );
    
            // Sort students by position and totalScore
            const sortedStudents = allStudents.sort((a, b) => {
                const aReport = a.studentTerminalReport[0];
                const bReport = b.studentTerminalReport[0];
    
                if (aReport.position !== bReport.position) {
                    return aReport.position - bReport.position;
                }
    
                return bReport.totalScore - aReport.totalScore;
            });
    
            // Take top students based on the limit
            const topStudents = sortedStudents.slice(0, limit);
    
            // Ensure the first position student is part of the results
            if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
                topStudents.pop(); // Remove the last student if limit is reached
                topStudents.unshift(firstPositionStudent); // Add the first position student at the beginning
            }
    
            return { ...classData, topPerformingStudents: topStudents };
        });
    
        return adjustedResults;
    }

};    


export const tutorAnalytics = {
    getTotalTutors: async()=>{
        
    }
}