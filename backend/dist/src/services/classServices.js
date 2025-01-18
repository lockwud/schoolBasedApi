"use strict";
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
exports.deleteClass = exports.updateClassDetails = exports.fetchClassByName = exports.fetchClassById = exports.fetchClasses = exports.addClass = void 0;
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const classValidator_1 = require("../validators/classValidator");
const errorHandler_1 = require("../middleware/errorHandler");
const addClass = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateClassData = classValidator_1.classSchema.safeParse(data);
    if (!validateClassData.success) {
        const errors = validateClassData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const checkClassAvailability = yield prisma_1.default.classes.findFirst({
            where: {
                className: data.className
            }
        });
        if (!checkClassAvailability) {
            const saveClassInfo = yield prisma_1.default.classes.create({
                data: {
                    className: data.className,
                    capacity: parseInt(data.capacity)
                }
            });
            return saveClassInfo;
        }
        else {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Class already registered");
        }
    }
});
exports.addClass = addClass;
const fetchClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllClases = yield prisma_1.default.classes.findMany();
    return getAllClases;
});
exports.fetchClasses = fetchClasses;
const fetchClassById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedClass = yield prisma_1.default.classes.findUnique({
        where: {
            id
        }
    });
    return fetchedClass;
});
exports.fetchClassById = fetchClassById;
const fetchClassByName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedClass = yield prisma_1.default.classes.findFirst({
        where: {
            className
        }
    });
    return fetchedClass;
});
exports.fetchClassByName = fetchClassByName;
const updateClassDetails = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, exports.fetchClassById)(id))) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Class not found");
    }
    else {
        const updatedClassDetails = yield prisma_1.default.classes.update({
            where: {
                id
            },
            data: Object.assign({}, data)
        });
        return updatedClassDetails;
    }
});
exports.updateClassDetails = updateClassDetails;
const deleteClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedClass = yield prisma_1.default.classes.delete({
        where: {
            id
        }
    });
    return deletedClass;
});
exports.deleteClass = deleteClass;
