import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarperfilPPage } from './editarperfil-p.page';

const routes: Routes = [
  {
    path: '',
    component: EditarperfilPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarperfilPPageRoutingModule {}
