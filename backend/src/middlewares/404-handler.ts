import {RequestHandler} from 'express';
import {StatusCodes} from 'http-status-codes';
import {HttpError} from '../utils/http-error';

export const handle404: RequestHandler = (req, res, next): void => {
    if (!res.headersSent) {
        next(new HttpError(StatusCodes.NOT_FOUND, 'Not Found', `No response for: ${req.path}`));
    }
    next();
};
