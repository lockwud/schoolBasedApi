import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as student from "../../controllers/studentController"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
import upload from "../../utils/multer"

const studentRoute = Router();

// All endpoints for admin-student relationship
studentRoute.post("/admin/register",
    upload.single("photo"),
    validatePayload('student'),
    student.addStudent
);


studentRoute.get("/admin/fetch",
    authenticateJWT,
    authorizeRole(["admin"]),
    student.fetchStudents
);


studentRoute.get("/admin/fetch/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    student.fetchStudentById
);


studentRoute.put("/admin/update/:id",
    student.updateStudent
);


studentRoute.delete("/admin/delete/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    student.deleteStudent
);


studentRoute.put("/admin/autoDelete",
    authenticateJWT,
    authorizeRole(["admin"]),
    student.autoDeleteStudent
);


studentRoute.post("/admin/forgotPassword",
    student.requestPassword
);

studentRoute.put("/resetPassword",
    student.updatePassword
)

export default studentRoute;