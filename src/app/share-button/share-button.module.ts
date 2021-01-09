import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ShareButtonComponent} from './share-button.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ShareButtonService} from './share-button.service';

@NgModule({
  declarations: [
    ShareButtonComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    ShareButtonComponent,
  ],
  providers: [
    ShareButtonService,
  ],
  entryComponents: [],
})
export class ShareButtonModule {
}
