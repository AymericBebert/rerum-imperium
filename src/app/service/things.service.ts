import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {animationsRoutes} from '../animations.routes';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class ThingsService {
  constructor(private http: HttpClient,
              private storageService: StorageService,
              private snackBar: MatSnackBar,
  ) {
  }

  public putAnimation(url: string, animation: string): Observable<string | null> {
    return this.http.put<{ running: string | null; error: string; }>(animationsRoutes.putAnimation(url, animation), {}).pipe(
      tap(res => res.error && this.snackBar.open(`putAnimation: ${res.error}`, '', {duration: 3000})),
      catchError(error => {
        console.error('putAnimation', error);
        this.snackBar.open('Could not put animation', '', {duration: 3000});
        return EMPTY;
      }),
      map(res => res.running),
    );
  }
}
