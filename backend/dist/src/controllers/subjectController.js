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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTutorSubject = exports.getSubjectTutors = exports.getSubjectsByName = exports.getSubjects = exports.tutorsSubject = exports.saveSubject = void 0;
const subjectService = __importStar(require("../services/subjectService"));
const http_status_1 = require("../utils/http-status");
const catchAsync_1 = require("../utils/catchAsync");
exports.saveSubject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const addedsubject = yield subjectService.addSubject(data);
    res.status(http_status_1.HttpStatus.CREATED).json(addedsubject);
}));
exports.tutorsSubject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastName, subject } = req.body;
    const assignedTutor = yield subjectService.assignSubjectToTutors(lastName, subject);
    res.status(http_status_1.HttpStatus.ACCEPTED).json({ message: `Mr. ${assignedTutor.lastName}has been assigned to teach ${subject}` });
}));
exports.getSubjects = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield subjectService.fetchSubjects();
    res.status(http_status_1.HttpStatus.OK).json(subjects);
}));
exports.getSubjectsByName = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectName } = req.body;
    const fetchedSubject = yield subjectService.fetchSubjectByName(subjectName);
    res.status(http_status_1.HttpStatus.OK).json(fetchedSubject);
}));
exports.getSubjectTutors = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectName } = req.body;
    const subjectTutors = yield subjectService.fetchSubjectTutors(subjectName);
    res.status(http_status_1.HttpStatus.OK).json({ subjectTutors });
}));
exports.updateTutorSubject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectName, tutorName } = req.body;
    const updated = yield subjectService.updateSubjectTutor(subjectName, tutorName);
    res.status(http_status_1.HttpStatus.OK).json({ message: `Mr. ${updated.lastName}, has been assigned to teach ${subjectName}` });
}));
