import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarperfilAPageRoutingModule } from './editarperfil-a-routing.module';

import { EditarperfilAPage } from './editarperfil-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarperfilAPageRoutingModule
  ],
  declarations: [EditarperfilAPage]
})
export class EditarperfilAPageModule {}
