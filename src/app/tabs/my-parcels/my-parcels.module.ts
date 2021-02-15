import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyParcelsPageRoutingModule } from './my-parcels-routing.module';

import { MyParcelsPage } from './my-parcels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyParcelsPageRoutingModule
  ],
  declarations: [MyParcelsPage]
})
export class MyParcelsPageModule {}
