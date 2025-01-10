import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as student from "../../controllers/studentController"
// import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
import upload from "../../utils/multer"

const studentRoute = Router();

// All endpoints for admin-student relationship
studentRoute.post("/admin/register",
    upload.single("photo"),
    validatePayload('student'),
    student.addStudent
);


export default studentRoute;