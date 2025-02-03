// import { Request, Response, NextFunction } from "express";
// import { HttpStatus } from "../utils/http-status";
// import { catchAsync } from "../utils/catchAsync";
// import { analyticsService } from "../services/analyticsService"

// export const analyticsController = {
//   getAllAnalytics: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { limit } = req.query;

//     // Run all analytics in parallel
//     const [
//       totalStudents,
//       studentsByGender,
//       topPerformingStudents,
//       totalTutors,
//       totalPopulation,
//     ] = await Promise.all([
//       analyticsService.getTotalStudents(),
//       analyticsService.getStudentsByGender(),
//       analyticsService.getTopPerformingStudentsFromClass(Number(limit) || 10),
//       analyticsService.getTotalTutors(),
//       analyticsService.getTotalPopulation(),
//     ]);

//     // Combine results into a single object
//     const analyticsData = {
//       totalStudents,
//       studentsByGender,
//       topPerformingStudents,
//       totalTutors,
//       totalPopulation,
//     };

//     res.status(200).json(analyticsData);
//   }),
// };
