import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {CommandComponent} from './command.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    CommandComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommandComponent,
  ],
  entryComponents: [],
})
export class CommandModule {
}
