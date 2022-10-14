import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebacamPage } from './pruebacam.page';

const routes: Routes = [
  {
    path: '',
    component: PruebacamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebacamPageRoutingModule {}
