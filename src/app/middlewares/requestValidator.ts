import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodObject, ZodRawShape } from 'zod';
import AppError from '../errorHelpers/AppError';

export default function requestValidator(
    validatorSchema: ZodObject<ZodRawShape>
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await validatorSchema.parseAsync(req.body);
            next();
        } catch (error) {
            // console.log('🚀 ~ requestValidator ~ error:', error);
            const message =
                error && typeof error === 'object' && 'message' in error
                    ? (error as { message: string }).message
                    : 'Validation error';
            const err = new AppError(StatusCodes.BAD_REQUEST, message);
            next(err);
        }
    };
}
