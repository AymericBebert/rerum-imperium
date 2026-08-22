import {RequestHandler} from 'express';

export const loggerMiddleware: RequestHandler = (req, res, next): void => {
    console.log(`http> ${req.method}`
        + ` - ${req.path}`
        + ` - query ${JSON.stringify(req.query)}`
        + ` - body ${JSON.stringify(req.body)}`
        + '');
    next();
};
