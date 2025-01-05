import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as tutor from "../../controllers/tutorController"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
const tutorRoute = Router();


tutorRoute.post("/signup", 
    validatePayload('tutor'),
    tutor.signUp
);


export default tutorRoute;