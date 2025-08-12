import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z, { ZodError, ZodObject, ZodRawShape } from "zod";

export default function requestDataValidator(schema: ZodObject<ZodRawShape>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = await schema.parseAsync(req.body);
      req.body = body;
      next();
    } catch (error) {
      const errors = z.flattenError(error as ZodError);

      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: errors.fieldErrors });
    }
  };
}
