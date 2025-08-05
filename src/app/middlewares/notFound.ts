import { NextFunction, Request, Response } from 'express';
import AppError from '../errorHelpers/AppError';

export default function notFound(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const error = new AppError(404, `Not Found - ${req.originalUrl}`);

    next(error);
}
