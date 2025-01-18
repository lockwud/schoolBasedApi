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
exports.generateStudentIndex = exports.generateReferallCode = void 0;
const crypto = __importStar(require("crypto"));
const prisma_1 = __importDefault(require("./prisma"));
const generateReferallCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const code = crypto.randomUUID().slice(0, 6).toString();
    return code;
});
exports.generateReferallCode = generateReferallCode;
const generateStudentIndex = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Predefined starting indexes for each class
        const classStartingIndexes = {
            "Class1": "5221040101",
            "Class2": "5221040201",
            "Class3": "5221040301",
            "Class4": "5221040401",
            "Class5": "5221040501",
            "Class6": "5221040601",
            "JHS1": "5221040701",
            "JHS2": "5221040801",
            "JHS3": "5221040901",
        };
        // Fetch the class details using classId
        const classInfo = yield prisma_1.default.classes.findUnique({
            where: { id: classId },
            include: {
                student: {
                    orderBy: {
                        studentId: 'desc', // Get the latest student in this class
                    },
                },
            },
        });
        // Check if the class exists
        if (!classInfo) {
            throw new Error(`Class with id ${classId} not found`);
        }
        const { className, student } = classInfo;
        // Check if a starting index is defined for the given class
        if (!classStartingIndexes[className]) {
            throw new Error(`No starting index defined for class ${className}`);
        }
        // Determine the next index
        let nextIndex = student.length > 0
            ? BigInt(student[0].studentId.toString()) + BigInt(1) // Continue from the last student index
            : BigInt(classStartingIndexes[className]); // Start from the base class's starting index
        // Check for index availability and ensure uniqueness
        while (true) {
            // Check if the generated studentId already exists in the database
            const existingIndex = yield prisma_1.default.student.findUnique({
                where: { studentId: nextIndex.toString() },
            });
            if (!existingIndex) {
                // If the studentId is available (not already used), return it
                return nextIndex.toString();
            }
            // If the studentId already exists, increment by 1 and check again
            nextIndex++;
        }
    }
    catch (error) {
        throw new Error('Error generating student index');
    }
});
exports.generateStudentIndex = generateStudentIndex;
