import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "./user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
  }
};
