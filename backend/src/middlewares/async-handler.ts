import type {NextFunction, ParamsDictionary, Request, RequestHandler, Response,} from 'express-serve-static-core';

export const asyncHandler = <P extends ParamsDictionary = ParamsDictionary, ResBody = any, ReqBody = any>
(fn: RequestHandler<P, ResBody, ReqBody>) =>
  function asyncUtilWrap(req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) {
    const fnReturn = fn(req, res, next);
    return Promise.resolve(fnReturn).catch(next);
  };
