import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
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

studentRoute.post("/login",
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