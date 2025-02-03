// import { ErrorResponse } from './../utils/types';
// import { Request, Response, NextFunction } from "express";
// import HttpException from "../utils/http-error";
// import * as studentService from "../services/studentServices"
// import { HttpStatus } from "../utils/http-status";
// import { studentData } from '../validators/studentValidator';
// import cloudinary from '../utils/cloudinary';
// import { catchAsync } from '../utils/catchAsync';

// export const addStudent = catchAsync(async(
//     req: Request, 
//     res: Response, 
//     next: NextFunction
// )=>{
//         const data = req.body satisfies studentData
//         const photo = req.file? req.file.path : undefined;
//         const picture = {
//             photoUrl: "",
//             photoKey: "",
//         };
//         if(photo){
//             const uploaded = await cloudinary.uploader.upload(photo, {
//                 folder: "students/",
//             });
//             picture.photoUrl = uploaded.secure_url;
//             picture.photoKey = uploaded.public_id;
//         }
//         const newStudent = await studentService.registerStudent(data, picture)
//         res.status(HttpStatus.CREATED).json(newStudent)
   
// });


// export const login = catchAsync(async(
//     req: Request, 
//     res: Response, 
//     next: NextFunction
// )=>{
//         const {studentId, password} = req.body;
//         const student = await studentService.login(studentId, password)
//         res.status(HttpStatus.ACCEPTED).json({student})

// });


// export const fetchStudents = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const fetchedStudents = await studentService.fetchStudents()
//         res.status(HttpStatus.OK).json(fetchedStudents)
  
// });


// export const fetchStudentById = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const { studentId} = req.body;
//         const fetchedStudent = await studentService.fetchStudentById(studentId)
  
// });


// export const updateStudent = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const { studentId} = req.body;
//         const data = req.body
       
//         const updatedStudent = await studentService.updateStudentDetails(studentId, data)
//         res.status(HttpStatus.OK).json(updatedStudent)
 
// });


// export const deleteStudent = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const { studentId} = req.body;
//         await studentService.deleteStudents(studentId)
//         res.status(HttpStatus.NO_CONTENT).json("student record deleted")
  
// });


// export const autoDeleteStudent = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const deleteStudent = await studentService.automaticRemovalOfStudent()
//         res.status(HttpStatus.NO_CONTENT).json("student record deleted")
   
// });


// export const requestPassword = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const { studentId } = req.body;
//         const password = await studentService.forgotPassword(studentId)
//         res.status(HttpStatus.OK).json("Go to the administration for your password, \n Kindly change password after getting a password from the admin")
  
// });


// export const updatePassword = catchAsync(async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//         const { studentId, oldPassword, password } = req.body;
//         await studentService.changePassword(studentId, oldPassword, password)
//         res.status(HttpStatus.OK).json("Password reset successfully")
  
    
// });


