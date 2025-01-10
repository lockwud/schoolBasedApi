import * as crypto from "crypto"
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";
import prisma from "./prisma";

export const generateReferallCode = async()=>{
    const code =  crypto.randomUUID().slice(0, 6).toString();
    return code
};


export const generateStudentIndex = async (): Promise<string> => {
  try {
    // Get all students ordered by studentId in descending order
    const students = await prisma.student.findMany({
      select: {
        studentId: true,
      },
      orderBy: {
        studentId: 'desc',
      },
    });

    // If there are no students, start from a default starting index
    let nextIndex = students.length > 0 ? BigInt(students[0].studentId.toString()) + BigInt(1) : BigInt("5221040301");

    // Loop to find the next available index
    while (true) {
      // Check if the generated studentId already exists in the database
      const existingIndex = await prisma.student.findUnique({
        where: {
          studentId: nextIndex.toString(), // Convert BigInt to string before passing
        },
      });

      if (!existingIndex) {
        // If the studentId is available (not already used), return it
        return nextIndex.toString();
      }

      // If the studentId already exists, increment by 1 and check again
      nextIndex++;

      // Apply the specific gap logic
      if (nextIndex === BigInt(399)) {
        nextIndex = BigInt(400);
      }
    }
  } catch (error) {
    console.error('Error generating student index:', error);
    throw new Error('Error generating student index');
  }
};

