"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClassDetails = exports.getClassByName = exports.getClassById = exports.getClasses = exports.registerClass = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const classService = __importStar(require("../services/classServices"));
const http_status_1 = require("../utils/http-status");
const registerClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addClass = yield classService.addClass(data);
        res.status(http_status_1.HttpStatus.OK).json(addClass);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.registerClass = registerClass;
const getClasses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedClass = yield classService.fetchClasses();
        res.status(http_status_1.HttpStatus.OK).json(fetchedClass);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getClasses = getClasses;
const getClassById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedClass = yield classService.fetchClassById(id);
        res.status(http_status_1.HttpStatus.OK).json({ fetchedClass });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getClassById = getClassById;
const getClassByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className } = req.body;
        const fetchedClass = yield classService.fetchClassByName(className);
        res.status(http_status_1.HttpStatus.OK).json(fetchedClass);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getClassByName = getClassByName;
const updateClassDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const updatedDetails = yield classService.updateClassDetails(id, data);
        res.status(http_status_1.HttpStatus.OK).json(updatedDetails);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.updateClassDetails = updateClassDetails;
const deleteClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedClass = yield classService.deleteClass(id);
        res.status(http_status_1.HttpStatus.OK).json(deletedClass);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.deleteClass = deleteClass;
