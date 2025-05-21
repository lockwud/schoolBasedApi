"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../../controllers/analytics.controller");
const analyticsRoute = (0, express_1.Router)();
// Single route for all analytics
analyticsRoute.get("/", analytics_controller_1.analyticsController.getAllAnalytics);
exports.default = analyticsRoute;
