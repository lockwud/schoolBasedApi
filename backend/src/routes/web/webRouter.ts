import {Router } from "express"
import adminRoute from "./adminRoute";
import classRoute from "./classRoute";
import tutorRoute from "./tutorRoute";
import studentRoute from "./studentRoute";
import analyticsRoute from "./analyticsRoute";
const webRouter = Router();

webRouter.use("/admin", adminRoute)
webRouter.use("/class",  classRoute)
webRouter.use("/tutor", tutorRoute)
webRouter.use("/student", studentRoute)
webRouter.use("/analytics", analyticsRoute)


export default webRouter;