import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioAsigPageRoutingModule } from './horario-asig-routing.module';
import { HorarioAsigPage } from './horario-asig.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioAsigPageRoutingModule
  ],
  declarations: [HorarioAsigPage]
})
export class HorarioAsigPageModule {}
