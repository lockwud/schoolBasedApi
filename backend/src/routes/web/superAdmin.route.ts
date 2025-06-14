import { validatePayload } from "../../middleware/validate-payload";
import {Router} from "express"
import * as superAdmin from "../../controllers/superAdmin.controller"
import rateLimit from "express-rate-limit";

const superAdminRoute = Router();

// Rate limiter for the /verifyOtp route: max 5 requests per minute
const verifyOtpRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again later.",
});

// Rate limiter for the /signin route: max 5 requests per minute
const signInRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many sign-in attempts, please try again later.",
});

const onboardSchoolRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again later"
});



superAdminRoute.post("/signin", signInRateLimiter, superAdmin.signIn);
superAdminRoute.post("/signUp",validatePayload('superAdmin', 'super'),superAdmin.signUpSuperAdmin);
superAdminRoute.post("/verifyOtp", verifyOtpRateLimiter, superAdmin.verifyOtp); 
superAdminRoute.post("/sendPasswordResetLink", superAdmin.sendPasswordResetLink);
superAdminRoute.post("/resetPassword", superAdmin.resetPassword);
superAdminRoute.get("/admin", superAdmin.listSuperAdmins)
superAdminRoute.get("/admin/:id", superAdmin.getSuperAdminById)
superAdminRoute.put("/admin/:id", superAdmin.updateSuperAdmin);
superAdminRoute.delete("/admin/:id", superAdmin.removeSuperAdmin);


//school routes 
superAdminRoute.post("/onboard",  onboardSchoolRateLimiter, validatePayload("school", 'super'),superAdmin.registerSchool);
superAdminRoute.get("/schools", superAdmin.getAllSchools)
superAdminRoute.get("/schools/:id", superAdmin.getSchoolById)
superAdminRoute.put("/schools/:id", superAdmin.updateSchool);
superAdminRoute.delete("/schools/:id", superAdmin.deleteSchools);



export default superAdminRoute;



