import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {simplifyURL} from '../utils/utils';

@Injectable()
export class NavButtonsService {
  public backRouterNavigate = '';

  private readonly privateNavButtonClicked$ = new Subject<string>();

  constructor(private router: Router,
              private location: Location,
  ) {
  }

  public navButtonClicked$(buttonId?: string): Observable<string> {
    if (buttonId) {
      return this.privateNavButtonClicked$.pipe(filter(btn => btn === buttonId));
    }
    return this.privateNavButtonClicked$.asObservable();
  }

  public setBackRouterLink(backRouterNavigate: string): void {
    this.backRouterNavigate = backRouterNavigate;
  }

  public backClicked(): void {
    if (this.backRouterNavigate && this.backRouterNavigate.startsWith('/')) {
      this.router.navigate([this.backRouterNavigate]).catch(e => console.error('Navigation error:', e));
    } else if (this.backRouterNavigate === '[back]') {
      this.location.back();
    } else if (this.backRouterNavigate) {
      try {
        const current = this.router.parseUrl(this.router.routerState.snapshot.url).root.children.primary.segments.map(s => s.path);
        const destination = simplifyURL([...current, ...this.backRouterNavigate.split('/')]);
        this.router.navigate(destination).catch(e => console.error('Navigation error:', e));
      } catch (err) {
        console.error(`Error trying to navigate to ${this.backRouterNavigate}: ${err}`);
      }
    }
  }

  public navButtonClicked(buttonId: string): void {
    this.privateNavButtonClicked$.next(buttonId);
  }
}
