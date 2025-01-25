import { throwError } from "../middleware/errorHandler";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { attendanceSchema, attendanceDto } from "../validators/attendanceValidator";


export const createAttendance = async (attendanceData: attendanceDto | attendanceDto[]) => {
  const dataArray = Array.isArray(attendanceData) ? attendanceData : [attendanceData]; // Ensure it's an array

  // Validate each attendance record
  const errors: string[] = [];
  for (const data of dataArray) {
    const validation = attendanceSchema.safeParse(data);
    if (!validation.success) {
      const validationErrors = validation.error.issues.map(
        ({ message, path }) => `${path}: ${message}`
      );
      errors.push(...validationErrors);
    }
  }

  if (errors.length > 0) {
    throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
  }

  // Check for duplicates
  const duplicateRecords = await prisma.attendance.findMany({
    where: {
      OR: dataArray.map((data) => ({
        studentId: data.studentId,
        date: data.date.toISOString(),
      })),
    },
  });

  if (duplicateRecords.length > 0) {
    throwError(
      HttpStatus.CONFLICT,
      "Some attendance records already exist for the given student(s) and date(s)"
    );
  }

  const newAttendances = await prisma.attendance.createMany({
    data: {...dataArray},
    skipDuplicates: true,
  });

  return { count: newAttendances.count }; 
};


export const fetchAttendanceRecords = async()=>{
  const allAttendances = await prisma.attendance.findMany()
  return allAttendances
};


