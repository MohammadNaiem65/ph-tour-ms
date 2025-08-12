import { Router } from "express";
import requestDataValidator from "../../middlewares/requestDataValidator";
import { createUser } from "./user.controller";
import { createUserZodSchema } from "./user.validator";

const router = Router();

router.post("/register", requestDataValidator(createUserZodSchema), createUser);

export const UserRouter = router;
