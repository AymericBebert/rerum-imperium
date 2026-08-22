import {ErrorRequestHandler} from 'express';
import {StatusCodes} from 'http-status-codes';
import {getReasonPhrase} from 'http-status-codes/build/cjs/utils-functions';
import {hasOwnProperty} from '../utils/has-own-property';
import {HttpError} from '../utils/http-error';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const finalErrorHandler: ErrorRequestHandler = (err, req, res, _) => {
    const responseCode = (typeof err.code === 'number' ? err.code as number : 0) || res.statusCode;
    const errMessage = typeof err.message === 'string' ? err.message as string : '';
    const responseMessage = errMessage || getReasonPhrase(responseCode);
    if (res.headersSent) {
        console.error('httpError> headers sent with', res.statusCode, responseMessage);
        if (hasOwnProperty(err, 'customDetails') && err.customDetails) {
            console.error('httpError>> error details:', err.customDetails);
        }
        return;
    }
    if (err instanceof HttpError) {
        console.error('httpError> responding with HttpError', responseCode, responseMessage);
        if (err.customDetails) {
            console.error('httpError>> error details:', err.customDetails);
        }
        return res.status(responseCode).send(responseMessage);
    }
    if (err.name === 'PayloadTooLargeError') {
        console.log(`http> ${req.method} - ${req.path}`);
        console.error('httpError> responding with HttpError', StatusCodes.REQUEST_TOO_LONG, responseMessage);
        return res.status(StatusCodes.REQUEST_TOO_LONG).send(responseMessage);
    }
    console.error('httpError> other error:', err.stack);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
};
