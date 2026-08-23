import {type RequestHandler, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {HotelProvider} from '../hotel-provider.ts';
import {RerumRoom} from '../live/rerum-room.ts';
import {asyncHandler} from '../middlewares/async-handler.ts';
import type {IImperiumAction} from '../model/imperium.ts';
import type {IRoom} from '../model/room.ts';
import {HttpError} from '../utils/http-error.ts';

const router = Router();

const getRoom: RequestHandler<{ token: string }> = (req, res, next) => {
  const token = req.params.token;
  res.locals.room = HotelProvider.getInstance().getRoom(token);
  if (!res.locals.room) {
    return next(new HttpError(StatusCodes.NOT_FOUND, '', `No room ${token}`));
  }
  next();
};

router.get<{ token: string }, IRoom>(
  '/room/:token',
  getRoom,
  asyncHandler((req, res) => {
    const room = res.locals.room as RerumRoom;
    res.send(room.room);
  }),
);

router.post<{ token: string }, boolean, IImperiumAction>(
  '/room/:token/action',
  getRoom,
  asyncHandler((req, res) => {
    const room = res.locals.room as RerumRoom;
    const result = room.imperiumAction(req.body);
    res.send(result);
  }),
);

export default router;
