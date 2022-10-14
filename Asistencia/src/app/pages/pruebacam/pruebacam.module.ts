import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebacamPageRoutingModule } from './pruebacam-routing.module';

import { PruebacamPage } from './pruebacam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebacamPageRoutingModule
  ],
  declarations: [PruebacamPage]
})
export class PruebacamPageModule {}
