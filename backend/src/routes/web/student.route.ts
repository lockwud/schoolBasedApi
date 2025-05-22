import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as student from "../../controllers/student.controller"
// import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
import upload from "../../utils/multer"

const studentRoute = Router();

// All endpoints for admin-student relationship
studentRoute.post("/register",
    upload.single("photo"),
    validatePayload('student'),
    student.addStudent
);

// Define rate limiter for login route
const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `windowMs`
    message: "Too many login attempts from this IP, please try again after a minute.",
});

studentRoute.post("/login",
    loginRateLimiter,
    student.login
);


studentRoute.get("/",
    // authenticateJWT,
    // authorizeRole(["admin"]),
    student.fetchStudents
);


studentRoute.get("/:id",
    // authenticateJWT,
    // authorizeRole(["admin"]),
    student.fetchStudentById
);


studentRoute.put("/:id",
    student.updateStudent
);


studentRoute.delete("/:id",
    // authenticateJWT,
    // authorizeRole(["admin"]),
    student.deleteStudent
);


studentRoute.put("/autoDelete",
    // authenticateJWT,
    // authorizeRole(["admin"]),
    student.autoDeleteStudent
);


studentRoute.post("/forgotPassword",
    student.requestPassword
);

studentRoute.put("/resetPassword",
    student.updatePassword
)

export default studentRoute;