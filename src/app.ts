import express, { Application } from "express";
import { UserRouter } from "./modules/users/user.routes";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", UserRouter);

export default app;
