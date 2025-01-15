import {Router } from "express"
import adminRoute from "./adminRoute";
import classRoute from "./classRoute";
import tutorRoute from "./tutorRoute";
import studentRoute from "./studentRoute";
import analyticsRoute from "./analyticsRoute";
import subjectRoute from "./subjectRoute";
const webRouter = Router();

webRouter.use("/admins", adminRoute)
webRouter.use("/classes",  classRoute)
webRouter.use("/tutors", tutorRoute)
webRouter.use("/students", studentRoute)
webRouter.use("/analytics", analyticsRoute)
webRouter.use("/subjects", subjectRoute)


export default webRouter;