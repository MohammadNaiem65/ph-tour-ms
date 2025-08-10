import { NextFunction, Request, Response } from 'express';
import AppError from '../errorHelpers/AppError';

function globalErrorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let status = 500;
    const response = {
        success: false,
        message: 'Internal Server Error',
    };

    if (error instanceof AppError) {
        status = error.statusCode;
        response.message = error.message;
    } else if (error instanceof Error) {
        response.message = error.message;
    }

    res.status(status).json(response);
}

export default globalErrorMiddleware;
