import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { CookieService } from 'ngx-cookie-service';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})
export class ReservaPage {
  public reservas: any;
  public habitaciones: any;
  public listaReservas: Array<Object> = [];
  public listaHabitaciones: Array<Object> = [];
  public inicioSeleccionado: String;
  public finSeleccionado: String;
  public opcionesCalendario: Options;
  @ViewChild('Habitacion') habitacion;
  @ViewChild(CalendarComponent) calendario: CalendarComponent;

  constructor(
    public navCtrl: NavController,
    public fireStore: AngularFirestore,
    public alertController: AlertController,
    private cookie: CookieService
  ) {
    if (this.cookie.get('logeado') == '') {
      this.navCtrl.push('LoginPage');
    } else {
      var self = this;

     
      this.opcionesCalendario = {
        locale: 'es',
        selectable: true,
        unselectAuto: false,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: []
      };

      this.reservas = this.fireStore.collection('Reservas');

      this.reservas
        .get()
        .toPromise()
        .then(function(resultados) {
        
          resultados.forEach(function(documento) {
            if (documento.data().nombre) {
              self.listaReservas.push({
                title: documento.data().nombre,
                start: documento.data().inicio,
                end: documento.data().fin
              });
            }
          });

          
          self.calendario.fullCalendar('renderEvents', self.listaReservas);
          self.calendario.fullCalendar('rerenderEvents');
        });

      
      this.habitaciones = this.fireStore.collection('Habitaciones');

      this.habitaciones
        .get()
        .toPromise()
        .then(function(resultados) {
          resultados.forEach(function(documento) {
          
            if (documento.data().nombre) {
              self.listaHabitaciones.push({
                id: documento.id,
                nombre: documento.data().nombre,
                capacidad: documento.data().capacidad
              });
            }
          });
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPage');
  }

  
  fechaSeleccionada(inicio, fin) {
    this.inicioSeleccionado = inicio.format();
    this.finSeleccionado = fin.format();
  }

  registrar() {
    var opcionesAlert;

    var error = false;

    
    if (this.inicioSeleccionado == null || this.finSeleccionado == null) error = true;
    if (this.habitacion.value == null) error = true;

    if (!error) {
     
      var reserva = {
        title: this.habitacion.text,
        start: this.inicioSeleccionado,
        end: this.finSeleccionado
      };

      
      this.calendario.fullCalendar('renderEvent', reserva);
      this.calendario.fullCalendar('rerenderEvents');

      this.listaReservas.push(reserva);

      
      this.reservas.add({
        usuario: this.cookie.get('logeado'),
        habitacion: this.habitacion.value,
        nombre: this.habitacion.text,
        inicio: this.inicioSeleccionado,
        fin: this.finSeleccionado
      });

      opcionesAlert = {
        message: 'Se ha guardado tu reserva.',
        buttons: ['OK']
      };
    } else {
      opcionesAlert = {
        message: 'Completa el formulario correctamente para poder realizar la reserva.',
        buttons: ['OK']
      };
    }

   
    var alert = this.alertController.create(opcionesAlert);
    alert.present();
  }
}
