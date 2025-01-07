import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as admin from "../../controllers/adminController"
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
    authenticateJWT,
    authorizeRole(["admin"]),
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

adminRoute.put("/update/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.updateAdminRecords
);

adminRoute.delete("/delete/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    admin.deleteAdmin
)


export default adminRoute;