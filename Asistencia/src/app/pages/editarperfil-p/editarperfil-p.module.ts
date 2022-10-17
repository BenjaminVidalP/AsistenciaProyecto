import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarperfilPPageRoutingModule } from './editarperfil-p-routing.module';

import { EditarperfilPPage } from './editarperfil-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarperfilPPageRoutingModule
  ],
  declarations: [EditarperfilPPage]
})
export class EditarperfilPPageModule {}
