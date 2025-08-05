/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import envConfigs from '../../config/env';
import AppError from '../errorHelpers/AppError';

interface Error {
    success: boolean;
    message: string;
    stack?: string;
    error: any;
}

export default function globalErrorMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let status = 500;
    const errorData: Error = {
        success: false,
        message: 'Something went wrong.',
        error,
    };

    if (error instanceof AppError) {
        status = error.statusCode;
        errorData.message = error.message;
    } else if (error instanceof Error) {
        errorData.message = error.message;
    }

    if (envConfigs.NODE_ENV === 'development') {
        errorData.stack = error.stack;
    }

    res.status(status).json(errorData);
}
