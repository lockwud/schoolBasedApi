import { Router } from "express";
import {analyticsController} from "../../controllers/analytics.controller"

const analyticsRoute = Router();


// Single route for all analytics
analyticsRoute.get("/", analyticsController.getAllAnalytics);


export default analyticsRoute;
