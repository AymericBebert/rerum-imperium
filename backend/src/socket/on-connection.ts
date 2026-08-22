import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Socket} from 'socket.io';
import {fromEvent$} from '../events';
import {RerumHotel} from '../live/rerum-hotel';

export function onConnection(socket: Socket, hotel: RerumHotel): void {
    console.log(`New connection from ${socket.id}`);
    const exited$ = new Subject<void>();

    fromEvent$(socket, 'satelles join').subscribe(announce => {

        const room = hotel.addSatelles(socket, announce);
        if (!room) {
            return;
        }

        fromEvent$(socket, 'satelles update')
            .pipe(takeUntil(exited$))
            .subscribe(commands => room.updateSatelles(announce.satelles.id, commands));

        fromEvent$(socket, 'satelles exit')
            .pipe(takeUntil(exited$))
            .subscribe(() => {
                exited$.next();
                hotel.removeSatelles(socket, announce);
            });

        fromEvent$(socket, 'disconnect')
            .pipe(takeUntil(exited$))
            .subscribe(() => {
                exited$.next();
                hotel.removeSatelles(socket, announce);
            });

        return;
    });

    fromEvent$(socket, 'imperium join').subscribe(async join => {

        const room = await hotel.addImperium(socket, join);
        if (!room) {
            return;
        }

        fromEvent$(socket, 'imperium action')
            .pipe(takeUntil(exited$))
            .subscribe(action => room.imperiumAction(action));

        fromEvent$(socket, 'imperium exit')
            .pipe(takeUntil(exited$))
            .subscribe(() => {
                exited$.next();
                hotel.removeImperium(socket, join).catch(err => console.error(err));
            });

        fromEvent$(socket, 'disconnect')
            .pipe(takeUntil(exited$))
            .subscribe(() => {
                exited$.next();
                hotel.removeImperium(socket, join).catch(err => console.error(err));
            });

        return;
    });
}
