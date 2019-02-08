import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { firebaseAuth } from '../../app/app.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  @ViewChild('nombre') nombre;
  @ViewChild('apellidos') apellidos;
  @ViewChild('usuario') usuario;
  @ViewChild('password') password;

  hom = HomePage;

  constructor(
    public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private cookie: CookieService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar() {
    var self = this;

    
    this.fireAuth.auth
      .createUserWithEmailAndPassword(
        this.usuario.value + '@' + firebaseAuth.authDomain,
        this.password.value
      )
      .then(function(data) {
       
        var usuarios = self.fireStore.collection('Usuarios');

        
        usuarios
          .add({
            nombre: self.nombre.value,
            apellidos: self.apellidos.value,
            usuario: self.usuario.value
          })
          
          .then(function(documento) {
            self.cookie.set('logeado', documento.id);

          
            self.navCtrl.push('ReservaPage');
          });
      })
     
      .catch(function(error) {
        console.log('error ', error);
      });
  }
}
