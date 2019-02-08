import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';

import { CookieService } from 'ngx-cookie-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  log = LoginPage;
  reg = RegistroPage;

  constructor(public navCtrl: NavController, private cookie: CookieService) {
    
    //if (this.cookie.get('logeado') != '') {
     // navCtrl.push('ReservaPage');
    //}
  }
}
