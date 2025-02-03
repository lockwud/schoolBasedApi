// import prisma from "../utils/prisma";

// const DEFAULT_TOP_STUDENT_LIMIT = 10;

// // Helper function to get top students
// const getTopStudents = (students: any[], limit: number) => {
//   // Filter out students without terminal reports
//   const validStudents = students.filter(
//     (student) =>
//       Array.isArray(student.studentTerminalReport) &&
//       student.studentTerminalReport.length > 0
//   );

//   const firstPositionStudent = validStudents.find((student) =>
//     student.studentTerminalReport?.some(
//       (report: { position: number }) => report.position === 1
//     )
//   );

//   const sortedStudents = validStudents.sort((a, b) => {
//     const aReport = a.studentTerminalReport[0];
//     const bReport = b.studentTerminalReport[0];

//     // Add nullish checks for position
//     if (aReport?.position !== bReport?.position) {
//       return (aReport?.position || Infinity) - (bReport?.position || Infinity);
//     }
//     return (bReport?.totalScore || 0) - (aReport?.totalScore || 0);
//   });

//   const topStudents = sortedStudents.slice(0, limit);

//   if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
//     topStudents.pop();
//     topStudents.unshift(firstPositionStudent);
//   }

//   return topStudents;
// };

// // Analytics service functions
// export const analyticsService = {
//   getTotalStudents: async () => {
//     return await prisma.student.count();
//   },

//   getStudentsByGender: async () => {
//     return await prisma.student.groupBy({
//       by: ["gender"],
//       _count: {
//         _all: true,
//       },
//     });
//   },

//   getTopPerformingStudentsFromClass: async (limit: number = DEFAULT_TOP_STUDENT_LIMIT) => {
//     const classesWithStudents = await prisma.classes.findMany({
//       include: {
//         student: {
//           include: {
//             studentTerminalReport: {
//               select: {
//                 position: true,
//                 totalScore: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Log the data to debug potential issues
//     console.log("Classes with Students:", JSON.stringify(classesWithStudents, null, 2));

//     return classesWithStudents.map((classData) => {
//       // Filter students with valid reports
//       const validStudents = classData.student.filter(
//         (student) =>
//           Array.isArray(student.studentTerminalReport) &&
//           student.studentTerminalReport.length > 0
//       );

//       return {
//         ...classData,
//         topPerformingStudents: getTopStudents(validStudents, limit),
//       };
//     });
//   },

//   getTotalTutors: async () => {
//     return await prisma.tutor.count();
//   },

//   getTotalPopulation: async () => {
//     const [studentCount, tutorCount] = await Promise.all([
//       prisma.student.count(),
//       prisma.tutor.count(),
//     ]);
//     return studentCount + tutorCount;
//   },
// };
