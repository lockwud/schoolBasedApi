import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import { ErrorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4500;
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", mainRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
