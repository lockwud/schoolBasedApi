import { Router } from "express";
import * as analytics from "../../controllers/analyticsController"

const analyticsRoute = Router();

analyticsRoute.get("/totalStudents",
     analytics.fetchTotalStudents
);

analyticsRoute.get("/studentsByGender",
     analytics.fetchStudentsByGender
);

analyticsRoute.get("/topPerforming",
     analytics.fetchTopPerformingStudent
);

analyticsRoute.get("/totalTutors",
     analytics.fetchTotalTutors
);

analyticsRoute.get("/population",
     analytics.fetchTotalPopulation
)

export default analyticsRoute;
