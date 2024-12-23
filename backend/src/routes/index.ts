import {Router} from "express"
const mainRouter = Router();



mainRouter.use("/web")
mainRouter.use("/mobile")



export default mainRouter;