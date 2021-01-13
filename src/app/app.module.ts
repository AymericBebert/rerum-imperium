import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {ChangeLanguageComponent} from './nav/change-language.component';
import {DebugHttpInterceptor} from './utils/debug-http.interceptor';
import {DeviceService} from './service/device.service';
import {ThingsService} from './service/things.service';
import {NavService} from './service/nav.service';
import {NavButtonsService} from './service/nav-buttons.service';
import {SettingsService} from './service/settings.service';
import {StorageModule} from './storage/storage.module';
import {UpdaterModule} from './updater/updater.module';
import {SocketModule} from './socket/socket.module';
import {RoomComponent} from './room/room.component';
import {HomeComponent} from './home/home.component';
import {ShareButtonModule} from './share-button/share-button.module';
import {RoomsService} from './service/rooms.service';
import {CommandModule} from './room/command/command.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ChangeLanguageComponent,
    HomeComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    StorageModule,
    UpdaterModule,
    SocketModule,
    ShareButtonModule,
    CommandModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DebugHttpInterceptor,
      multi: true
    },
    DeviceService,
    ThingsService,
    NavService,
    NavButtonsService,
    SettingsService,
    RoomsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {
}
