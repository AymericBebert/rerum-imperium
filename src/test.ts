// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {APP_CONFIG} from './config/app.config';
import {testConfig} from './config/test.config';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting([{provide: APP_CONFIG, useValue: testConfig}]),
  {teardown: {destroyAfterEach: false}},
);
