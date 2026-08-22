import {NgModule} from '@angular/core';
import {APP_CONFIG} from '../../config/app.config';
import {testConfig} from '../../config/test.config';

@NgModule({
  providers: [
    {provide: APP_CONFIG, useValue: testConfig},
  ],
})
export class ConfigTestingModule {
}
