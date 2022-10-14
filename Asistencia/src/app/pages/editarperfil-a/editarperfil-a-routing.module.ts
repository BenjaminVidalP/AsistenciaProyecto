import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarperfilAPage } from './editarperfil-a.page';

const routes: Routes = [
  {
    path: '',
    component: EditarperfilAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarperfilAPageRoutingModule {}
