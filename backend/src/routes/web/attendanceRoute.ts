import { Router } from "express";
import * as attendance from "../../controllers/attendanceController"
const attendanceRoute = Router();

attendanceRoute.post("/mark",
    attendance.createAttendance
);

attendanceRoute.get("/",
    attendance.getAttendanceRecords
);

export default attendanceRoute;