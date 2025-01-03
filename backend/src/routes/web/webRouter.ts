import {Router } from "express"
import adminRoute from "./adminRoute";
import classRoute from "./classRoute";
const webRouter = Router();

webRouter.use("/admin", adminRoute)
webRouter.use("/class",  classRoute)


export default webRouter;