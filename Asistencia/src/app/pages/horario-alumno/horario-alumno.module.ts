import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioAlumnoPageRoutingModule } from './horario-alumno-routing.module';
import { HorarioAlumnoPage } from './horario-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioAlumnoPageRoutingModule
  ],
  declarations: [HorarioAlumnoPage]
})
export class HorarioAlumnoPageModule {}
