import { NextFunction, Request, Response } from 'express';

type MiddlewareFn = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

const asyncHandler =
    (fn: MiddlewareFn) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: unknown) => {
            console.log('🚀 ~ asyncHandler ~ err:', err);

            next(err);
        });
    };

export default asyncHandler;
