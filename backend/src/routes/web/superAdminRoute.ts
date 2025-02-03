import { signUp } from './../../controllers/adminController';
import { validatePayload } from "../../middleware/validate-payload";
import {Router} from "express"
import * as superAdmin from "../../controllers/superAdmin.controller"

const superAdminRoute = Router();

superAdminRoute.post("/signin",validatePayload('superAdmin'),superAdmin.signIn);
superAdminRoute.post("/signUp",superAdmin.signUpSuperAdmin);
superAdminRoute.post("/verifyOtp",superAdmin.verifyOtp); 
superAdminRoute.patch("/change-password",superAdmin.changePassword)
superAdminRoute.get("/send-link",superAdmin.sendLink)

export default superAdminRoute;



