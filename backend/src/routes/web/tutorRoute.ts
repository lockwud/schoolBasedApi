import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as tutor from "../../controllers/tutorController"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
const tutorRoute = Router();


tutorRoute.post("/signup", 
    validatePayload('tutor'),
    tutor.signUp
);

tutorRoute.post("/login",
    tutor.login 
);

tutorRoute.post("/auth/verifyOtp",
  tutor.otpVerification
)

tutorRoute.get("/", 
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.getTutors
);


tutorRoute.get("/:id", 
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.getTtutorById
);


tutorRoute.get("/email",
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.getTutorByEmail
);

tutorRoute.put("/update/:id",
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.updateTutorDetails
);


tutorRoute.delete("/delete/:id",
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.deleteTutor
);

tutorRoute.post("/forgotPassword",
    tutor.sendPasswordResetLink
);

tutorRoute.put("/resetPassword/:token",
    tutor.resetPassword
);

export default tutorRoute;