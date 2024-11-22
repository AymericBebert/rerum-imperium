import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {ShareButtonComponent} from './share-button.component';

@Injectable({
  providedIn: 'root',
})
export class ShareButtonService {
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);


  public shareOrCopy(title: string, text: string, url: string): void {
    const fakeShareButton = new ShareButtonComponent(this.snackBar, this.translateService);
    fakeShareButton.title = title;
    fakeShareButton.text = text;
    fakeShareButton.url = url;
    fakeShareButton.activate();
  }
}
