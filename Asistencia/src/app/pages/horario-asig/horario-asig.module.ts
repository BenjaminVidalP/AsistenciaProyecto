import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioAsigPageRoutingModule } from './horario-asig-routing.module';
import { HorarioAsigPage } from './horario-asig.page';
import { HpMartesComponent } from 'src/app/components/hp-martes/hp-martes.component';
import { HpMiercolesComponent } from 'src/app/components/hp-miercoles/hp-miercoles.component';
import { HpJuevesComponent } from 'src/app/components/hp-jueves/hp-jueves.component';
import { HpViernesComponent } from 'src/app/components/hp-viernes/hp-viernes.component';
import { HpLunesComponent } from 'src/app/components/hp-lunes/hp-lunes.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioAsigPageRoutingModule
  ],
  declarations: [HorarioAsigPage, HpLunesComponent ,HpMartesComponent,HpMiercolesComponent,HpJuevesComponent,HpViernesComponent]
})
export class HorarioAsigPageModule {}
