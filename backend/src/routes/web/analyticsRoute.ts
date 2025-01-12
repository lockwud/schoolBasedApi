import { Router } from "express";
import * as analytics from "../../controllers/analyticsController"

const analyticsRoute = Router();

analyticsRoute.get("/totalStudents",
     analytics.fetchTotalStudents
);

analyticsRoute.get("/studentsByGender",
     analytics.fetchStudentsByGender
);

export default analyticsRoute;
