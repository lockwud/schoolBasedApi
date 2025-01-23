import { throwError } from "../middleware/errorHandler";
import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { classes, gender, student } from '@prisma/client';

const DEFAULT_TOP_STUDENT_LIMIT = 10;

const getTopStudents = (students: (student & { studentTerminalReport: { position: number; totalScore: number }[] })[], limit: number): (student & { studentTerminalReport: { position: number; totalScore: number }[] })[] => {
    const firstPositionStudent = students.find(student =>
        student.studentTerminalReport?.some(report => report.position === 1)
    );

    const sortedStudents = students.sort((a, b) => {
        const aReport = a.studentTerminalReport[0];
        const bReport = b.studentTerminalReport[0];

        if (aReport.position !== bReport.position) {
            return aReport.position - bReport.position;
        }
        return bReport.totalScore - aReport.totalScore;
    });

    const topStudents = sortedStudents.slice(0, limit);

    if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
        topStudents.pop(); // Remove last student to maintain the limit
        topStudents.unshift(firstPositionStudent); // Add first position student
    }

    return topStudents;
};


export const studentAnalytics = {
    getTotalStudents: async () => {
        const totalStudents = await prisma.student.count();
        return totalStudents;
    },

    getStudentsByGender: async () => {
        const countByGender = await prisma.student.groupBy({
            by: [ 'gender' ],
            _count:{
                _all: true
            }
        });
        return countByGender;
    },

        getTopPerformingStudentsFromClass: async (limit: number = DEFAULT_TOP_STUDENT_LIMIT) => {
            try {
                const classesWithStudents: (classes & {
                    student: (student & {
                        studentTerminalReport: { position: number; totalScore: number }[];
                    })[];
                })[] = await prisma.classes.findMany({
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
    
                return classesWithStudents.map(classData => {
                    const topStudents = getTopStudents(classData.student, limit);
                    return { ...classData, topPerformingStudents: topStudents };
                });
            } catch (error) {
                console.error("Error fetching top-performing students:", error);
                throwError(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching top-performing students")
            }
        },

};    


export const tutorAnalytics = {
    getTotalTutors: async()=>{
        const totalTutors = await prisma.tutor.count()
        return totalTutors
    }
};


export const totalPopulationAnalytics = {
    Population: async()=>{
        const sumOfPopulation = await prisma.student.count() + await prisma.tutor.count()
        return sumOfPopulation
    }
};