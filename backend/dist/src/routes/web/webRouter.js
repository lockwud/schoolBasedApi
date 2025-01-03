"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRoute_1 = __importDefault(require("./adminRoute"));
const classRoute_1 = __importDefault(require("./classRoute"));
const webRouter = (0, express_1.Router)();
webRouter.use("/admin", adminRoute_1.default);
webRouter.use("/class", classRoute_1.default);
exports.default = webRouter;
