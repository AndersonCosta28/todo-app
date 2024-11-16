import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../commons/HttpError';


export async function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
        console.error(error.stack);

        res.status(error.status).json({
            error: {
                message: error.message,
            },
        });
    }
    else {
        res.status(500).json({
            error: {
                message: error || 'Internal Server Error',
            },
        });
    }
    next(error)
}
