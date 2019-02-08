import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaPage } from './reserva';

import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [ReservaPage],
  imports: [IonicPageModule.forChild(ReservaPage), FullCalendarModule]
})
export class ReservaPageModule {}
