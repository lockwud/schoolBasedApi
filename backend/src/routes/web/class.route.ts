import { validatePayload } from '../../middleware/validate-payload';
import { Router } from "express";
import * as classes from "../../controllers/class.controller"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
import rateLimit from "express-rate-limit";
const classRoute = Router();

classRoute.post("/add",
     validatePayload('classes'),
     //authenticateJWT,
     //authorizeRole(["admin"]),
    classes.registerClass
);

classRoute.get("/",
    //authenticateJWT,
    //authorizeRole(["admin", "tutors"]),
    classes.getClasses
);

const getClassByIdLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

classRoute.get("/:id", 
    getClassByIdLimiter,
    authenticateJWT,
    authorizeRole(["admin", "tutors"]),
    classes.getClassById
);

classRoute.get("/name",
    authenticateJWT,
    authorizeRole(["admin", "tutors"]),
    classes.getClassByName
);

classRoute.put("/update/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    classes.updateClassDetails
);

classRoute.delete("/delete/:id",
    authenticateJWT,
    authorizeRole(["admin"]),
    classes.deleteClass
)


export default classRoute;