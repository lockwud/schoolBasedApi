import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
import * as tutor from "../../controllers/tutor.controller"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
const tutorRoute = Router();

// All enpoint for admin tutor relation
tutorRoute.post("/admin/signup", 
    validatePayload('tutor'),
    // authenticateJWT,
    // authorizeRole(["admin"]),
    tutor.signUp
);


// All enpoint for tutor self registration and crud

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
    // authenticateJWT,
    // authorizeRole(["admin", "tutor"]),
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

const updateTutorRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "Too many update requests from this IP, please try again after a minute."
});

tutorRoute.put("/update/:id",
    updateTutorRateLimiter,
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.updateTutorDetails
);


import rateLimit from "express-rate-limit";

const deleteTutorRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "Too many delete requests from this IP, please try again after a minute."
});

tutorRoute.delete("/delete/:id",
    deleteTutorRateLimiter,
    authenticateJWT,
    authorizeRole(["admin", "tutor"]),
    tutor.deleteTutor
);


export default tutorRoute;