// import * as crypto from "crypto"
// import HttpException from "./http-error";
// import { HttpStatus } from "./http-status";
// import prisma from "../../config/superClient";

// export const generateReferallCode = async()=>{
//     const code =  crypto.randomUUID().slice(0, 6).toString();
//     return code
// };

// export const createClass = async (schoolId: string) => {
//   await prisma.classes.create({
//     data: {
//       className: "Class A",
//       capacity: 30,
//       school: {
//         connect: { id: schoolId }, // Provide the school ID to connect the relation
//       },
//     },
//   });
// };

// export const generateStudentIndex = async (classId: string): Promise<string> => {
//   try {
//     // Predefined starting indexes for each class
//     const classStartingIndexes: { [key: string]: string } = {
//       "Class1": "5221040101",
//       "Class2": "5221040201",
//       "Class3": "5221040301",
//       "Class4": "5221040401",
//       "Class5": "5221040501",
//       "Class6": "5221040601",
//       "JHS1": "5221040701",
//       "JHS2": "5221040801",
//       "JHS3": "5221040901",
//     };

//     // Fetch the class details using classId
//     const classInfo = await prisma.classes.findUnique({
//       where: { id: classId },
//       include: {
//         students: {
//           orderBy: {
//             studentId: 'desc', // Get the latest student in this class
//           },
//         },
//       },
//     });

//     // Check if the class exists
//     if (!classInfo) {
//       throw new Error(`Class with id ${classId} not found`);
//     }

//     const { className, students } = classInfo;

//     // Check if a starting index is defined for the given class
//     if (!classStartingIndexes[className]) {
//       throw new Error(`No starting index defined for class ${className}`);
//     }

//     // Determine the next index
//     let nextIndex =
//       students.length > 0
//         ? BigInt(students[0].studentId.toString()) + BigInt(1) // Continue from the last student index
//         : BigInt(classStartingIndexes[className]); // Start from the base class's starting index

//     // Check for index availability and ensure uniqueness
//     while (true) {
//       // Check if the generated studentId already exists in the database
//       const existingIndex = await prisma.student.findUnique({
//         where: { studentId: nextIndex.toString() },
//       });

//       if (!existingIndex) {
//         // If the studentId is available (not already used), return it
//         return nextIndex.toString();
//       }

//       // If the studentId already exists, increment by 1 and check again
//       nextIndex++;
//     }
//   } catch (error) {
//     throw new Error('Error generating student index');
//   }
// };
