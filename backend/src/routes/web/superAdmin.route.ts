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

superAdminRoute.post("/signin", signInRateLimiter, validatePayload('superAdmin'), superAdmin.signIn);
superAdminRoute.post("/signUp",superAdmin.signUpSuperAdmin);
superAdminRoute.post("/verifyOtp", verifyOtpRateLimiter, superAdmin.verifyOtp); 

export default superAdminRoute;



