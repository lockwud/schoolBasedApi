import {Router} from "express"
import webRouter from "./web/web.route";
const mainRouter = Router();




mainRouter.use("/web", webRouter)
// mainRouter.use("mobile")



export default mainRouter;