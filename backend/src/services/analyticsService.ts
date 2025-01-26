import prisma from "../utils/prisma";

const DEFAULT_TOP_STUDENT_LIMIT = 10;

// Helper function to get top students
const getTopStudents = (
  students: any[],
  limit: number
) => {
  const firstPositionStudent = students.find((student) =>
    student.studentTerminalReport?.some((report: { position: number; }) => report.position === 1)
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
    topStudents.pop();
    topStudents.unshift(firstPositionStudent);
  }

  return topStudents;
};

// Analytics service functions
export const analyticsService = {
  getTotalStudents: async () => {
    return await prisma.student.count();
  },

  getStudentsByGender: async () => {
    return await prisma.student.groupBy({
      by: ["gender"],
      _count: {
        _all: true,
      },
    });
  },

  getTopPerformingStudentsFromClass: async (limit: number = DEFAULT_TOP_STUDENT_LIMIT) => {
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

    return classesWithStudents.map((classData) => ({
      ...classData,
      topPerformingStudents: getTopStudents(classData.student, limit),
    }));
  },

  getTotalTutors: async () => {
    return await prisma.tutor.count();
  },

  getTotalPopulation: async () => {
    const [studentCount, tutorCount] = await Promise.all([
      prisma.student.count(),
      prisma.tutor.count(),
    ]);
    return studentCount + tutorCount;
  },
};
