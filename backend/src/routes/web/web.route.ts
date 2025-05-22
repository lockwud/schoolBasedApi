import {Router } from "express"
import adminRoute from "./admin.route";
import classRoute from "./class.route";
import tutorRoute from "./tutor.route";
import studentRoute from "./student.route";
import analyticsRoute from "./analytics.route";
import subjectRoute from "./subject.route";
import attendanceRoute from "./attendance.route";
import superAdminRoute from "./superAdmin.route";
const webRouter = Router();

webRouter.use("/admins", adminRoute)
webRouter.use("/classes",  classRoute)
webRouter.use("/tutors", tutorRoute)
webRouter.use("/students", studentRoute)
webRouter.use("/analytics", analyticsRoute)
webRouter.use("/subjects", subjectRoute)
webRouter.use("/attendances", attendanceRoute)
webRouter.use('/superAdmins',superAdminRoute)


export default webRouter;