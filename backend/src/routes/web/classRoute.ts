import { validatePayload } from './../../middleware/validate-payload';
import { Router } from "express";
import * as classes from "../../controllers/classController"
import {authenticateJWT, authorizeRole} from "../../utils/jsonwebtoken"
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

classRoute.get("/:id", 
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