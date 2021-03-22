import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {ShareButtonComponent} from './share-button.component';

@Injectable()
export class ShareButtonService {

  constructor(private snackBar: MatSnackBar,
              private translateService: TranslateService,
  ) {
  }

  public shareOrCopy(title: string, text: string, url: string): void {
    const fakeShareButton = new ShareButtonComponent(this.snackBar, this.translateService);
    fakeShareButton.title = title;
    fakeShareButton.text = text;
    fakeShareButton.url = url;
    fakeShareButton.activate();
  }
}
