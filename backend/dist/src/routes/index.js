"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const web_route_1 = __importDefault(require("./web/web.route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/web", web_route_1.default);
// mainRouter.use("mobile")
exports.default = mainRouter;
