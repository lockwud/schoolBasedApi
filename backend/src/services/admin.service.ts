import { HttpStatus } from "../utils/http-status";
import {hash, compare} from "../utils/bcrypt"
import { adminData, adminSchema } from "../validators/adminValidator";
import { generateOtp, sendOtpEmail} from "../utils/emailTransporter"
import { throwError } from "../middleware/errorHandler";
import { signToken } from "../utils/jsonwebtoken";
import superDB from "../../config/superClient";
import {getTenantClient} from "../../config/tenantClient"


export const registerAdmin = async (schoolId: string, data: adminData) => {
  const validateAdminData = adminSchema.safeParse(data);
  if (!validateAdminData.success) {
    const errors = validateAdminData.error.issues.map(
      ({ message, path }) => `${path}: ${message}`
    );
    throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
  }

  const school = await superDB.school.findUnique({
    where: { 
      id: schoolId,
    },
    select:{
      databaseUrl: true,
    }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND,"School or tenant DB not found");
  }
  
  // Check if admin already exists
  const checkAdminAvailability = await getTenantClient(school?.databaseUrl!).admin.findUnique({
    where: {
      email: data.email,
    },
  });
  if (checkAdminAvailability) {
    throwError(HttpStatus.CONFLICT, "Admin already exists");
  }
  
  const tenantDB = getTenantClient(school?.databaseUrl!);
  const checkEnvForAdmin = process.env.SHOOL_ADMINS_EMAIL === data.email
  if(!checkEnvForAdmin){
    throwError(HttpStatus.NOT_FOUND, "Admin email not set, kindly contact support")
  }
  const hashedPassword = await hash(data.password);
  const admin = await tenantDB.admin.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    }
  })
      const { password, ...adminDataWithoutPassword } = admin;
  await tenantDB.$disconnect();
  return { adminDataWithoutPassword};
};


export const signInAdmin = async (schoolId: string, email: string, password: string) => {
  const school = await superDB.school.findUnique({
    where:{
      id: schoolId
    }
  })
  const admin = await getTenantClient(school?.databaseUrl!).admin.findUnique({
    where: {
      email: email,
    },
  });
  if(!school && !admin){
    throwError(HttpStatus.NOT_FOUND, "Admin not found")
  }
  const validPassword = await compare(password, admin?.password!)
  if(!validPassword){
    throwError(HttpStatus.NOT_FOUND, "Invalid email or password")
  }
  const otp = await generateOtp()
  await sendOtpEmail(admin?.email!, otp)
   setTimeout(async () => {
    await getTenantClient(school?.databaseUrl!).admin.update({
    where: {
      email: admin?.email!
    },
    data: {
      otp: otp
    }
             
    });
    }, 5 * 60 * 1000);
    return {message: "Check your email for otp"}; 
};

export const verifyOtp = async(email: string, otp: string) =>{
  await getTe
}


// export const updateAdmin = async(id: string, updateData: Partial<admin> )=>{
//     const findAdmin = await prisma.admin.findUnique({
//         where:{
//             id
//         }
//     })
//     if(!findAdmin){
//        throwError(HttpStatus.NOT_FOUND, "admin not found");
//     }else{
//         if(updateData.password){
//             const hashpassword = await hash(updateData.password);
//             if(!hashpassword){
//                throwError(
//                     HttpStatus.INTERNAL_SERVER_ERROR,
//                     "Error hashing password"
//                   );
//             }
//             updateData.password = hashpassword
//         }
//         const updatedAdmin = await prisma.admin.update({
//             where: {id},
//             data: updateData,
//         });
//         const {password, ...adminDataWithoutPassword} = updatedAdmin
//         return adminDataWithoutPassword
//     }

// };


// export const fetchAdminByEmail = async(email: string)=>{
//     const findAdmin = await prisma.admin.findUnique({
//         where:{
//             email
//         }
//     })
//     return findAdmin
// };


// export const fetchAllAdmins = async()=>{
//     const fetchedAdmins = await prisma.admin.findMany();
//     return fetchedAdmins

// };


// export const fetchAdminById = async(id: string)=>{
//     const findAdmin = await prisma.admin.findUnique({
//         where: {
//             id
//         }
//     })
//     return findAdmin
// };


// export const deleteAdminRecords = async(id: string)=>{
//     const deletedAdmin = await prisma.admin.delete({
//         where:{
//             id
//         }
//     })
//     return deletedAdmin
// };


// export const forgotPassword = async(email: string)=>{
//     if(!(await fetchAdminByEmail(email) )){
//        throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
//     }else{
//         const otp = await generateOtp();
//         await sendOtpEmail(email, otp)
//         await prisma.admin.update({
//             where:{
//                 email
//             },
//             data:{
//                 otp,
//             }
//         })
//         setTimeout(async()=>{
//             await prisma.admin.update({
//                 where:{
//                     email
//                 },
//                 data:{
//                     otp: null
//                 }
//             })
//         }
//         , 300000)
//         return {message: "Check your email for otp"}

//     }
// }

// export const verifyOtp = async(email: string, otp: string)=>{
//     const findAdmin = await prisma.admin.findUnique({where: {email}})
//     if(!findAdmin){
//        throwError(HttpStatus.NOT_FOUND, "Admin does not exist");
//     }else{
//         if(findAdmin.otp === otp){
//             const token = signToken({ id: findAdmin.id, role: "admin" });
//             await prisma.admin.update({
//                 where:{
//                     email
//                 },
//                 data:{
//                     otp: null,
//                     token: token
//                 }
//             })

//             return {token}
//         }else{
//             throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
//         }
//     }
// }

 
// export const resetPassword = async (newPassword: string, token: string) => {
//     // Find the user by token
//     const admin = await prisma.admin.findFirst({ where: { token } });
//     if (!admin) {
//       throwError(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
//     }
  
//     const hashedPassword = await hash(newPassword);
  
//     await prisma.admin.update({
//       where: { id: admin?.id! },
//       data: {
//         password: hashedPassword,
//         token: null, 
//       },
//     });
  
//     return { message: "Password reset successfully"};
//   };