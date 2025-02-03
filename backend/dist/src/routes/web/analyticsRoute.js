"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../../controllers/analyticsController");
const analyticsRoute = (0, express_1.Router)();
// Single route for all analytics
analyticsRoute.get("/", analyticsController_1.analyticsController.getAllAnalytics);
exports.default = analyticsRoute;
