import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { ReservaPage } from '../pages/reserva/reserva';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';

export var firebaseAuth = {
  apiKey: 'AIzaSyBIMnvTQEdXdik98uJj9uxGm7WOG0RkwaA',
  authDomain: 'reservahotel-1981e.firebaseapp.com',
  databaseURL: 'https://reservahotel-1981e.firebaseio.com',
  projectId: 'reservahotel-1981e',
  storageBucket: 'reservahotel-1981e.appspot.com',
  messagingSenderId: '563373691183'
};

@NgModule({
  bootstrap: [IonicApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  entryComponents: [MyApp, HomePage, LoginPage, RegistroPage],
  declarations: [MyApp, HomePage, LoginPage, RegistroPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CookieService
  ]
})
export class AppModule {}
