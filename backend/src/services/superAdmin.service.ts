import { HttpStatus } from "../utils/http-status";
import superDB from "../../config/superClient";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { generateOtp, sendOtpEmail } from "../utils/emailTransporter"
import { throwError } from "../middleware/errorHandler";
import { superAdminData, superAdminSchema, schoolData, schoolSchema } from "../validators/superAdmin.validator";
import { migrateTenantDb } from "../../config/tenantMigrate";
import { checkMobileNetwork, phoneValidator } from "../utils/phone.check";


export const createSuperAdmin = async(data: superAdminData)=>{
     const validatedPhone = await phoneValidator(data.phone);
     const phone = await checkMobileNetwork(validatedPhone!);
    const validateSuperAdminData = superAdminSchema.safeParse(data)
    if(!validateSuperAdminData.success){
        const errors = validateSuperAdminData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkSuperAdminAvailability = await superDB.superAdmin.findUnique({
            where:{
                email: data.email,
            },
        });

        if(!checkSuperAdminAvailability){
            const allowedEmails = process.env.SUPER_ADMIN_EMAIL?.split(',').map(email => email.trim());
            const checkEnvForSuperAdmin = allowedEmails?.includes(data.email);

            if (!checkEnvForSuperAdmin) {
                throwError(HttpStatus.INTERNAL_SERVER_ERROR, "Super admin email not set, kindly contact support");
            }

            const hashedPassword = await hash(data.password);
           
            // Save superAdmin to the database
            const saveSuperAdmin = await superDB.superAdmin.create({
                data: {
                   ...data,
                    password: hashedPassword,
                    phone: phone!
                },
            });
            const { password,...superAdminDataWithoutPassword } = saveSuperAdmin;
            return { superAdminDataWithoutPassword };
        }else{
            throwError(HttpStatus.CONFLICT, "Super admin already exists");
        }

    }
};



export const loginSuperAdmin = async(email: string, password: string)=>{
    const findSuperAdmin = await superDB.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        const isValidPassword = await compare(password, findSuperAdmin.password);
        if(!isValidPassword){
            throwError(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
           const otp = await generateOtp();
            await sendOtpEmail(findSuperAdmin.email, otp);

           await superDB.superAdmin.update({
            where: { email },
            data: { otp },

           })
           setTimeout(async () => {
            await superDB.superAdmin.update({
                where: { email },
                data: { otp: null },
            });
           }, 5 * 60 * 1000); // 
           return {message: "Check your email for otp"};
    }
};


export const verifySuperAdminOtp = async(email: string, otp: string)=>{
    const findSuperAdmin = await superDB.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        if(findSuperAdmin.otp === otp){
            const { password, ...superAdminWithoutPassword } = findSuperAdmin;
            const token = signToken({ id: findSuperAdmin.id, role: "super" });
            await superDB.superAdmin.update({
                where: { email },
                data: { otp: null, status: "active", verified: true }, 
            });
            return { superAdmin: superAdminWithoutPassword, token };
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
    }
};


// send password reset link and reset password
export const sendPasswordResetLink = async(email: string)=>{
    const superAdmin = await superDB.superAdmin.findUnique({
        where: { email },
    });
    if(!superAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }
    const resetToken = signToken({ id: superAdmin?.email!, role: "super" });
    await sendOtpEmail(email, `Click the link to reset your password: http://localhost:4500/reset-password?token=${resetToken}`);
    return { message: "Password reset link sent to your email", resetToken };
};

export const resetPassword = async(email: string, newPassword: string)=>{
    const superAdmin = await superDB.superAdmin.findUnique({
        where: { email },
    });
    if(!superAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }
    const hashedPassword = await hash(newPassword);
    const updatedSuperAdmin = await superDB.superAdmin.update({
        where: { email },
        data: { password: hashedPassword },
    });

    if(!updatedSuperAdmin){
        throwError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to reset password");
    }
    const { password, ...superAdminWithoutPassword } = updatedSuperAdmin;

    return { message: "Password reset successfully", superAdmin: updatedSuperAdmin };
};

export const fetchSuperAdminS = async()=>{
    const superAdmins = await superDB.superAdmin.findMany();
    const superAdminsWithoutPassword = superAdmins.map(({ password, ...rest }) => rest);
    return superAdminsWithoutPassword;
}


export const fetchSuperAdminById = async(id: string)=>{
    const superAdmin = await superDB.superAdmin.findUnique({
        where: { 
            id: id
        },
    });
    
    if (!superAdmin) {
        throwError(HttpStatus.NOT_FOUND, "Super admin not found")
    }
    return superAdmin
}

export const updateSuperAdmin = async(id: string, data: Partial<superAdminData>)=>{
    const validateSuperAdminData = superAdminSchema.safeParse(data)
    if(!validateSuperAdminData.success){
        const errors = validateSuperAdminData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const superAdmin = await superDB.superAdmin.update({
            where: { id },
            data: {
                ...data

            }
        })
        return superAdmin
    }
}


export const deleteSuperAdmin = async(id: string)=>{
    const superAdmin = await superDB.superAdmin.delete({
        where: { id },
    })
    return superAdmin
}

// School  Service

export const onboardSchool = async(data: schoolData)=>{
    const validateSchoolData = schoolSchema.safeParse(data)
    if(!validateSchoolData.success){
        const errors = validateSchoolData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkSchoolAvailablity = await superDB.school.findFirst({
            where: {
                databaseUrl: data.databaseUrl,
            },

        })
        if(checkSchoolAvailablity){
            throwError(HttpStatus.CONFLICT, "School with this database URL already exists");
        }   
        
        try{
            migrateTenantDb(data.databaseUrl)
            const school = await superDB.school.create({
                data: {
                    schoolName: data.schoolName,
                    type: data.type,
                    databaseName: data.databaseName,
                    databaseUrl: data.databaseUrl,
                    logoUrl: data.logoUrl,
                    logoKey: data.logoKey,
                    subscriptionDate: new Date(data.subscriptionDate),
                    endOfLife: new Date(data.endOfLife),
                }
            })
            return school
        }catch(err){
            console.error("Error creating school in superDB:", err);
            throwError(HttpStatus.INTERNAL_SERVER_ERROR, "School onboarding failed")
        }

}
};


export const fetchSchools = async()=>{
    const schools = await superDB.school.findMany()
    if(!schools || schools.length === 0){
        throwError(HttpStatus.NOT_FOUND, "No schools found");
    }
    schools.forEach(school => {
        delete (school as any).databaseUrl;
        delete (school as any).databaseName;
    });
    if(schools.length === 0){
        throwError(HttpStatus.NOT_FOUND, "No schools found");
    }   
    return schools
}

export const fetchSchoolById = async(id: string)=>{
    const school = await superDB.school.findUnique({
        where: { 
            id: id
        },
    });
    
    if (!school) {
        throwError(HttpStatus.NOT_FOUND, "School not found")
    }
    delete (school as any).databaseUrl;
    delete (school as any).databaseName;
    return school
}


export const updateSchool = async(id: string, data: Partial<schoolData>)=>{
        const school = await superDB.school.update({
            where: { id },
            data: {
               ...data
            }
        })
    if (!school) {
        throwError(HttpStatus.NOT_FOUND, "School not found")
    }
    delete (school as any).databaseUrl;
    delete (school as any).databaseName;
        return school
}

export const deleteSchool = async(id: string)=>{
    const school = await superDB.school.delete({
        where: { id },
    })
    return school
}






