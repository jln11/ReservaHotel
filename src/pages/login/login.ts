import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { firebaseAuth } from '../../app/app.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('Usuario') usuario;
  @ViewChild('Contraseña') password;

  hom = HomePage;

  constructor(
    public navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private cookie: CookieService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logear() {
    var self = this;

    
    this.fireAuth.auth
      .signInWithEmailAndPassword(
        this.usuario.value + '@' + firebaseAuth.authDomain,
        this.password.value
      )
     
      .then(function(data) {
       
        var usuarios = self.fireStore.collection('Usuarios', function(ref) {
          return ref.where('usuario', '==', self.usuario.value);
        });

        usuarios
          .get()
          .toPromise()
          
          .then(function(resultados) {
            
            resultados.forEach(function(documento) {
              self.cookie.set('logeado', documento.id);
            });

            
            self.navCtrl.push('ReservaPage');
          });
      })
      
      .catch(error => {
        console.log('error', error);
      });
  }
}
