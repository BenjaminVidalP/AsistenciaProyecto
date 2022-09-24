import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HaLunesComponent } from 'src/app/components/ha-lunes/ha-lunes.component';
import { HaMartesComponent } from 'src/app/components/ha-martes/ha-martes.component';
import { HaMiercolesComponent } from 'src/app/components/ha-miercoles/ha-miercoles.component';
import { HaJuevesComponent } from 'src/app/components/ha-jueves/ha-jueves.component';
import { HaViernesComponent } from 'src/app/components/ha-viernes/ha-viernes.component';
import { HorarioAlumnoPage } from './horario-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioAlumnoPage,
    children: [
      {
        path: 'diaLunes',
        component: HaLunesComponent
      },
      {
        path:'diaMartes',
        component: HaMartesComponent
      },
      {
        path:'diaMiercoles',
        component: HaMiercolesComponent
      },
      {
        path:'diaJueves',
        component:HaJuevesComponent
      },
      {
        path:'diaViernes',
        component:HaViernesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioAlumnoPageRoutingModule {}
