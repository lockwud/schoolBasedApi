import { HttpStatus } from "../utils/http-status";
import superDB from "../../config/superClient";
import {hash, compare} from "../utils/bcrypt"
import { signToken } from "../utils/jsonwebtoken";
import { generateOtp, sendOtpEmail } from "../utils/emailTransporter"
import { throwError } from "../middleware/errorHandler";
import { superAdminData, superAdminSchema, schoolData, schoolSchema } from "../validators/superAdmin.validator";
import { migrateTenantDb } from "../../config/tenantMigrate";


export const createSuperAdmin = async(data: superAdminData)=>{
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
            const hashedPassword = await hash(data.password);
            // Save superAdmin to the database
            const saveSuperAdmin = await superDB.superAdmin.create({
                data: {
                   ...data,
                    password: hashedPassword,
                },
            });

            const signedToken = signToken({ id: saveSuperAdmin.id, role: "super" });
            const superAdmin = await superDB.superAdmin.update({
                where: {
                    id: saveSuperAdmin.id,
                },
                data: {
                    token: signedToken,
                },
            })
            const { password,...superAdminDataWithoutPassword } = superAdmin;
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
            await sendOtpEmail(email, otp);

           await superDB.superAdmin.update({
            where: { email },
            data: { otp },

           })
           setTimeout(async () => {
            await superDB.superAdmin.update({
                where: { email },
                data: { otp: null },
            });
           }, 5 * 60 * 1000);
           return {message: "Check your email for otp"};
    }
};


export const verifySuperAdminOtp = async(email: string, otp: string)=>{
    const findSuperAdmin = await superDB.superAdmin.findUnique({ where: { email } });
    if(!findSuperAdmin){
        throwError(HttpStatus.NOT_FOUND, "Super admin not found");
    }else{
        if(findSuperAdmin.otp === otp){
            const token = signToken({ id: findSuperAdmin.id, role: "super" });
            return { superAdmin: findSuperAdmin, token };
        }else{
            throwError(HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
    }
};

export const onboardSchool = async(data: schoolData)=>{
    const validateSchoolData = schoolSchema.safeParse(data)
    if(!validateSchoolData.success){
        const errors = validateSchoolData.error.issues.map(
            ({ message, path }) => `${path}: ${message}`
            )
            throwError(HttpStatus.BAD_REQUEST, errors.join(". "));
    }else{
        const checkSchoolAvailablity = await superDB.school.findUnique({
            where: {
                databaseName: data.databaseName
            },
        })
        
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
            console.error("❌ Error creating school in superDB:", err);
            throwError(HttpStatus.INTERNAL_SERVER_ERROR, "School onboarding failed")
        }

}
};


export const fetchSchools = async()=>{
    const schools = await superDB.school.findMany()
    return schools
}
