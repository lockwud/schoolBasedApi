import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as admin from "../../controllers/adminController"
// import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
const adminRoute = Router();


adminRoute.post("/signup", 
    validatePayload('admin'),
    admin.signUp
);

adminRoute.post("/login",
    admin.login 
);

adminRoute.post("/:id/verifyOtp", 
    admin.otpVerification
);

adminRoute.post("/forgotPassword",
    admin.forgotPassword
);

adminRoute.put("/resetPassword/:token", 
    admin.resetPassword
);

adminRoute.get("/", admin.getAdmins)



export default adminRoute;