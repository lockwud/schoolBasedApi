// import { HttpStatus } from "../utils/http-status";
// import prisma from "../../config/superClient";
// import {compare} from "../utils/bcrypt"
// import { signToken } from "../utils/jsonwebtoken";
// import { tutorData, tutorSchema } from "../validators/tutorValidator";
// import { tutor } from "@prisma/client";
// import { throwError } from "../middleware/errorHandler";

// export const addTutor = async (data: tutorData) => {
//     const validateTutorData = tutorSchema.safeParse(data);
//     if (!validateTutorData.success) {
//         const errors = validateTutorData.error.issues.map(
//             ({ message, path }) => `${path}: ${message}`
//         );
//        throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
//     }

//     // Check if the tutor already exists
//     const checkTutorAvailability = await prisma.tutor.findUnique({
//         where: {
//             email: data.email,
//         },
//     });

//     if (!checkTutorAvailability) {
//         // Validate the provided registration code
//         const findAdminRegistrationCode = await prisma.admin.findUnique({
//             where: {
//                 tutorRegistrationCode: data.registrationCode ,
//             },
//         });

//         if (!findAdminRegistrationCode) {
//            throwError(HttpStatus.FORBIDDEN, "Invalid registration code");
//         } else {
           
//             }

           
// }};


// export const signIn = async(email: string, password: string)=>{
//     const fetchedTutor = await prisma.tutor.findUnique({
//         where:{
//             email
//         }
//     })
//    if(!fetchedTutor){
//    throwError(HttpStatus.NOT_FOUND, "Tutor does not exist")
//    }else{
//     const verifiedPassword = await compare(password, fetchedTutor.password)
//     if(!verifiedPassword){
//        throwError(HttpStatus.UNAUTHORIZED, "Invalid email or password")
//     }else{
//         return "check your email for otp"
//     }
//    }
// };


// export const fetchTutors = async()=>{
//     const getAllTutors = await prisma.tutor.findMany({
       
//         orderBy:{
//             createdAt: "desc"
//         },
//         include:{
//             subjects: true
//         }
//     })
//     return getAllTutors
// };


// export const fetchTutorById = async(id: string)=>{
//     const fetchedTutor = await prisma.tutor.findUnique({
//         where:{
//             id
//         }
//     })
//     return fetchedTutor
// };


// export const fetchTutorByEmail = async(email: string)=>{
//     const fetchedTutor = await prisma.tutor.findUnique({
//         where:{
//             email
//         }
//     })
//     return fetchedTutor
// };


// export const updateTutor = async(id: string, data: Partial<tutor>)=>{
  
//         const findTutor = await prisma.tutor.findUnique({
//             where:{
//                 id
//             }
//         })
//         if(!findTutor){
//            throwError(HttpStatus.NOT_FOUND, "Tutor not found")
//         }else{
//             const updatedTutor = await prisma.tutor.update({
//                 where:{
//                     id
//                 },
//                 data
//             })
//             return updatedTutor
//         }
// };


// export const deleteTutor = async(id: string)=>{
//     const findTutor = await prisma.tutor.findUnique({
//         where:{
//             id
//         }
//     })
//     if(!findTutor){
//        throwError(HttpStatus.NOT_FOUND, "Tutor not found")
//     }else{
//         await prisma.tutor.delete({
//             where:{
//                 id
//             }
//         })
//         return {message: "Tutor deleted successfully"}
//     }
// };



// export const verifyOtp = async (email: string, otp: string) => {
//     const tutor = await prisma.tutor.findUnique({ where: { email } });
  
//     if (!tutor) {
//      throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP or Tutor not found");
//     }
  
//     // Check if the OTP matches
//     if (tutor!.otp !== otp) {
//      throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
//     }
  
//     // Generate a JWT token if OTP is correct
//     const token = signToken({ id: tutor!.id,role:'tutor' });
  
//     // Clear the OTP from the database after successful verification
//     await prisma.tutor.update({
//         where: {
//             id: tutor!.id
//         },
//         data: { otp: null },
        
//     });
  
//     return token;
//   };