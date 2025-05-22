import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
import * as admin from "../../controllers/admin.controller"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
import rateLimit from "express-rate-limit";

const adminRoute = Router();

const emailRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: "Too many requests to this endpoint from this IP, please try again later."
});
const updateAdminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 update requests per windowMs
    message: "Too many update requests from this IP, please try again later."
});

const deleteAdminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 delete requests per windowMs
    message: "Too many delete requests from this IP, please try again later."
});

adminRoute.post("/signup", 
    validatePayload('admin'),
    admin.signUp
);

adminRoute.post("/login",
    admin.login 
);

const otpVerificationRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: "Too many OTP verification attempts from this IP, please try again later."
});

adminRoute.post("/verifyOtp", 
    otpVerificationRateLimiter,
    admin.otpVerification
);

adminRoute.post("/forgotPassword",
    admin.forgotPassword
);

adminRoute.put("/resetPassword/:token", 
    admin.resetPassword
);

adminRoute.get("/", 
    // authenticateJWT,
    // authorizeRole(["admin"]),
    admin.getAdmins
);

const getAdminByIdRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: "Too many requests to this endpoint from this IP, please try again later."
});

adminRoute.get("/:id",
    getAdminByIdRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.getAdminById
);




adminRoute.get("/email",
    emailRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.getAdminByEmail
);



adminRoute.put("/update/:id",
    updateAdminRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.updateAdminRecords
);


adminRoute.delete("/delete/:id",
    deleteAdminRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.deleteAdmin
)


export default adminRoute;