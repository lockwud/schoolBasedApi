"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/extractFields.ts
const fs_1 = require("fs");
const prisma_schema_parser_1 = require("@loancrate/prisma-schema-parser");
const schemaPath = "./prisma/schema.prisma";
const schema = (0, fs_1.readFileSync)(schemaPath, "utf-8");
const parsedSchema = (0, prisma_schema_parser_1.parsePrismaSchema)(schema);
// const extractModels = (data: Declarations): ExtractedModel[] => {
//   writeFileSync("./generatedSchema.json", JSON.stringify(data, null, 2));
//   return data.declarations.map((model) => {
//     if (model.name) {
//       const modelName = model.name.value;
//       const fields = model.members
//         .filter((member) => {
//           if (member.type && member.type.kind && member.type.kind === "list") {
//             return false;
//           }
//           if (
//             member.attributes &&
//             member.attributes.some((attr) =>
//               attr.path.value.includes("relation")
//             )
//           ) {
//             return false;
//           }
//           // if (member.attributes && member.attributes.length > 0) return false;
//           return true;
//         })
//         .map((member) => member.name.value);
//       return {
//         modelName,
//         fields,
//       };
//     } else {
//       return {
//         modelName: "",
//         fields: [],
//       };
//     }
//   });
// };
const extractModels = (data) => {
    (0, fs_1.writeFileSync)("./generatedSchema.json", JSON.stringify(data, null, 2));
    if (!data.declarations || !Array.isArray(data.declarations)) {
        return [];
    }
    return data.declarations.map((model, modelIndex) => {
        var _a, _b;
        const modelName = (_b = (_a = model === null || model === void 0 ? void 0 : model.name) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : `UnnamedModel_${modelIndex}`;
        const fields = (model.members || [])
            .filter((member, memberIndex) => {
            var _a;
            if (!member || !member.name || !member.name.value) {
                return false;
            }
            if (((_a = member.type) === null || _a === void 0 ? void 0 : _a.kind) === "list") {
                return false;
            }
            if (member.attributes &&
                member.attributes.some((attr) => {
                    var _a;
                    return Array.isArray((_a = attr.path) === null || _a === void 0 ? void 0 : _a.value) &&
                        attr.path.value.includes("relation");
                })) {
                return false;
            }
            return true;
        })
            .map((member) => { var _a; return ((_a = member.name) === null || _a === void 0 ? void 0 : _a.value) || "unknown"; });
        return {
            modelName,
            fields,
        };
    });
};
const allowedFields = extractModels(parsedSchema);
(0, fs_1.writeFileSync)("./generatedSchema.json", JSON.stringify(parsedSchema, null, 2));
(0, fs_1.writeFileSync)("./allowedFields.json", JSON.stringify(allowedFields, null, 2));
