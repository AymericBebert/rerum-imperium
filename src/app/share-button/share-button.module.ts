import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule} from '@ngx-translate/core';
import {ShareButtonComponent} from './share-button.component';
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
})
export class ShareButtonModule {
}
