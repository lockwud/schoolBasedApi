import { Router } from "express";
import * as attendance from "../../controllers/attendanceController"
const attendanceRoute = Router();

attendanceRoute.post("/mark",
    attendance.createAttendance
);

attendanceRoute.get("/all",
    attendance.getAttendanceRecords
);

export default attendanceRoute;