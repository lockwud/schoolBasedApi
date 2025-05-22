import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
import * as admin from "../../controllers/admin.controller"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
const adminRoute = Router();


adminRoute.post("/signup", 
    validatePayload('admin'),
    admin.signUp
);

adminRoute.post("/login",
    admin.login 
);

adminRoute.post("/verifyOtp", 
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

adminRoute.get("/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.getAdminById
);

adminRoute.get("/email",
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.getAdminByEmail
);

const updateAdminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 update requests per windowMs
    message: "Too many update requests from this IP, please try again later."
});

adminRoute.put("/update/:id",
    updateAdminRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.updateAdminRecords
);

import rateLimit from "express-rate-limit";

const deleteAdminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 delete requests per windowMs
    message: "Too many delete requests from this IP, please try again later."
});

adminRoute.delete("/delete/:id",
    deleteAdminRateLimiter,
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.deleteAdmin
)


export default adminRoute;