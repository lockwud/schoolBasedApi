import { throwError } from "../middleware/errorHandler";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { attendanceSchema, attendanceDto } from "../validators/attendanceValidator";
import { startOfDay, isEqual } from 'date-fns';

export const createAttendance = async (attendanceData: attendanceDto | attendanceDto[]) => {
  const dataArray = Array.isArray(attendanceData) ? attendanceData : [attendanceData]; 
  // Normalize date to ensure comparison is based on the day only
  const normalizedDataArray = dataArray.map((data) => ({
    ...data,
    date: startOfDay(new Date(data.date)), 
  }));

  // Validate each attendance record
  const errors: string[] = [];
  for (const data of normalizedDataArray) {
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

  const duplicateRecords = await prisma.attendance.findMany({
    where: {
      OR: normalizedDataArray.map((data) => ({
        studentId: data.studentId,
        date: startOfDay(new Date(data.date)), // Ensure only the date part is compared
      })),
    },
  });

  const duplicateIds = new Set(duplicateRecords.map((record) => record.studentId));
  const nonDuplicateData = normalizedDataArray.filter(
    (data) => !duplicateIds.has(data.studentId)
  );

  if (nonDuplicateData.length === 0) {
    throwError(
      HttpStatus.CONFLICT,
      "Attendance has already been recorded for the given student(s) on the selected date(s)."
    );
  }

  const newAttendances = await prisma.attendance.createMany({
    data: [...nonDuplicateData],
    skipDuplicates: true, 
  });

  return { count: newAttendances.count };
};


export const fetchAttendanceRecords = async()=>{
  const allAttendances = await prisma.attendance.findMany()
  return allAttendances
};


