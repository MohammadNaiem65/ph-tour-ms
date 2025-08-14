import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import z, { ZodError, ZodObject, ZodRawShape } from 'zod';
import AppError from '../errorHelpers/AppError';

export default function requestValidator(
    validatorSchema: ZodObject<ZodRawShape>
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await validatorSchema.parseAsync(req.body);
            next();
        } catch (error) {
            // console.log(
            //     '🚀 ~ requestValidator ~ error:',
            //     (error as ZodError).issues
            // );

            const response = z.flattenError(error as ZodError).fieldErrors;

            const err = new AppError(
                StatusCodes.BAD_REQUEST,
                JSON.stringify(response)
            );
            next(err);
        }
    };
}
