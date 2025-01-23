import {Router } from "express"
import adminRoute from "./adminRoute";
import classRoute from "./classRoute";
import tutorRoute from "./tutorRoute";
import studentRoute from "./studentRoute";
import analyticsRoute from "./analyticsRoute";
import subjectRoute from "./subjectRoute";
import attendanceRoute from "./attendanceRoute";
const webRouter = Router();

webRouter.use("/admins", adminRoute)
webRouter.use("/classes",  classRoute)
webRouter.use("/tutors", tutorRoute)
webRouter.use("/students", studentRoute)
webRouter.use("/analytics", analyticsRoute)
webRouter.use("/subjects", subjectRoute)
webRouter.use("/attendances", attendanceRoute)



export default webRouter;