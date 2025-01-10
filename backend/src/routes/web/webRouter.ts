import {Router } from "express"
import adminRoute from "./adminRoute";
import classRoute from "./classRoute";
import tutorRoute from "./tutorRoute";
import studentRoute from "./studentRoute";
const webRouter = Router();

webRouter.use("/admin", adminRoute)
webRouter.use("/class",  classRoute)
webRouter.use("/tutor", tutorRoute)
webRouter.use("/student", studentRoute)


export default webRouter;