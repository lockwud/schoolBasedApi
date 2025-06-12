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

const otpVerificationRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: "Too many OTP verification attempts from this IP, please try again later."
});

const getAdminByIdRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: "Too many requests to this endpoint from this IP, please try again later."
});


adminRoute.post("/signup/:id", 
    validatePayload('admin','tenant'),
    admin.signUp
);

adminRoute.post("/login/:schoolId",
    admin.login 
);


adminRoute.post("/verifyOtp", 
    otpVerificationRateLimiter,
    admin.verifyOtp
);

adminRoute.post("/forgotPassword",
    admin.sendPasswordResetLink
);

adminRoute.put("/resetPassword/:token", 
    admin.resetPassword
);

adminRoute.get("/:id/admins", 
    // authenticateJWT,
    // authorizeRole(["admin"]),
    admin.getAdmins
);



adminRoute.get("/:schoolId/:id",
    getAdminByIdRateLimiter,
    // authenticateJWT,
    // authorizeRole(["admin"]),
    admin.getAdminById
);


adminRoute.patch("/:schoolId/:id",
    updateAdminRateLimiter,
    admin.updateAdminRecords
);

adminRoute.delete("/:schoolId/:id",
    deleteAdminRateLimiter,
    // authenticateJWT,
    // authorizeRole(["admin"]),
    admin.deleteAdmin
)


export default adminRoute;