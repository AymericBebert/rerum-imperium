import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SettingsService {

  public darkMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
