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

export const verifyOtp = async (schoolId: string, email: string, otp: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);

  const admin = await tenantDB.admin.findUnique({
    where: {
      email: email,
    },
  });
  if (!admin) {
    throwError(HttpStatus.NOT_FOUND, "Admin not found")
  }
  if (admin?.otp !== otp) {
    throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP")
    return
  }
  const token = signToken({ id: admin.id, role: "admin" });
  await tenantDB.admin.update({
    where: {
      email: email,
    },
    data: {
      otp: null,
      token: token,
    },
  });
  await tenantDB.$disconnect();
  return { token }
}


// send password reset link and reset password
export const sendPasswordResetLink = async (schoolId: string, email: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);

  const admin = await tenantDB.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throwError(HttpStatus.NOT_FOUND, "Admin not found");
    return;
  }

  const resetToken = signToken({ id: admin.email, role: "admin" });
  await sendOtpEmail(email, `Click the link to reset your password: http://localhost:4500/  reset-password?token=${resetToken}`);
  return { message: "Password reset link sent to your email", resetToken };

  };

export const resetPassword = async (schoolId: string, email: string, newPassword: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);

  const admin = await tenantDB.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throwError(HttpStatus.NOT_FOUND, "Admin not found");
    return;
  }

  const hashedPassword = await hash(newPassword);
  await tenantDB.admin.update({
    where: { email },
    data: { password: hashedPassword },
  });
  
  await tenantDB.$disconnect();
  return { message: "Password reset successfully" };
};


export const fetchAdmins = async (schoolId: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);
  
  const admins = await tenantDB.admin.findMany();
  if (!admins || admins.length === 0) {
    throwError(HttpStatus.NOT_FOUND, "No admins found");
    return;
  }
  const adminsWithoutPassword = admins.map(({ password, ...rest }) => rest);

  await tenantDB.$disconnect();
  return adminsWithoutPassword;
};


export const fetchAdminById = async (schoolId: string, adminId: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);
  
  const admin = await tenantDB.admin.findUnique({
    where: { id: adminId },
  });
  
  if (!admin) {
    throwError(HttpStatus.NOT_FOUND, "Admin not found");
    return;
  }
  
  await tenantDB.$disconnect();
  return admin;
};


export const updateAdmin = async (schoolId: string, adminId: string, data: Partial<adminData>) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);
  
  const admin = await tenantDB.admin.update({
    where: { id: adminId },
    data: {
      ...data,
    }
  });
  
  await tenantDB.$disconnect();
  return admin;
}


export const deleteAdmin = async (schoolId: string, adminId: string) => {
  const school = await superDB.school.findUnique({
    where: { id: schoolId },
    select: { databaseUrl: true }
  });

  if (!school) {
    throwError(HttpStatus.NOT_FOUND, "School or tenant DB not found");
    return;
  }

  const tenantDB = getTenantClient(school.databaseUrl);
  
  const admin = await tenantDB.admin.delete({
    where: { id: adminId },
  });
  
  await tenantDB.$disconnect();
  return admin;
};