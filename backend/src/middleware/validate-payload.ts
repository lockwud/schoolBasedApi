import { RequestHandler, Request, Response, NextFunction } from "express";
import superAllowedFields from "../../allowedFields/super.json";
import tenantAllowedFields from "../../allowedFields/tenant.json";
import { HttpStatus } from "../utils/http-status";

type Scope = "super" | "tenant";

export const validatePayload =
  (model: string, scope: Scope = "super"): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const allowedFieldsList = scope === "super" ? superAllowedFields : tenantAllowedFields;

    const modelFields = allowedFieldsList.find(
      (field) => field.modelName.toLowerCase() === model.toLowerCase()
    );

    if (!modelFields) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Validation schema for model "${model}" not found.`,
      });
    }

    const payload = req.body;
    const dataFields = Object.keys(payload);
    const unwantedFields = dataFields.filter(
      (field) => !modelFields.fields.includes(field)
    );

    if (unwantedFields.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Unwanted fields are not allowed",
        fields: unwantedFields,
      });
    }

    next();
  };
