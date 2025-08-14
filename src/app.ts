import express, { Application } from "express";
import { V1Router } from "./routes/v1";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", V1Router);

export default app;
