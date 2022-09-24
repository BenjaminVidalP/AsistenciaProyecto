import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HpLunesComponent } from 'src/app/components/hp-lunes/hp-lunes.component';
import { HpMartesComponent } from 'src/app/components/hp-martes/hp-martes.component';
import { HpMiercolesComponent } from 'src/app/components/hp-miercoles/hp-miercoles.component';
import { HpJuevesComponent } from 'src/app/components/hp-jueves/hp-jueves.component';
import { HpViernesComponent } from 'src/app/components/hp-viernes/hp-viernes.component';
import { HorarioAsigPage } from './horario-asig.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioAsigPage,
    children: [
      {
        path: 'hpDiaLunes',
        component: HpLunesComponent
      },

      {
        path: 'hpDiaMartes',
        component: HpMartesComponent
      },

      {
        path: 'hpDiaMiercoles',
        component: HpMiercolesComponent
      },

      {
        path: 'hpDiaJueves',
        component: HpJuevesComponent
      },

      {
        path:'hpDiaViernes',
        component: HpViernesComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioAsigPageRoutingModule {}
