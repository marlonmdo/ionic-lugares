import { LugaresService } from './../services/lugares';
import { ObtemLocalizacaoPage } from './../pages/obtem-localizacao/obtem-localizacao';
import { LugarPage } from './../pages/lugar/lugar';
import { AdicionaLugarPage } from './../pages/adiciona-lugar/adiciona-lugar';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from "angular2-google-maps/core";
import { Geolocation} from "@ionic-native/geolocation";
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from "@ionic-native/camera";
import { File} from "@ionic-native/file";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("https://www.einerd.com.br/wp-content/uploads/2016/05/rei-da-noite-got.bmp");
    })
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdicionaLugarPage,
    LugarPage,
    ObtemLocalizacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAflzCAW1TfxJ3EsLU323Ho5hIKEQORv-M'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdicionaLugarPage,
    LugarPage,
    ObtemLocalizacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LugaresService,
    File, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
