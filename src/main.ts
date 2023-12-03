import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {isDevMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideServiceWorker} from '@angular/service-worker';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {DebugHttpInterceptor} from './app/utils/debug-http.interceptor';
import {APP_CONFIG, appConfigFactory} from './config/app.config';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {provide: APP_CONFIG, useFactory: appConfigFactory},
    {provide: HTTP_INTERCEPTORS, useClass: DebugHttpInterceptor, multi: true},
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }).providers!,
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
