import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintBarcodePageRoutingModule } from './print-barcode-routing.module';

import { PrintBarcodePage } from './print-barcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintBarcodePageRoutingModule
  ],
  declarations: [PrintBarcodePage]
})
export class PrintBarcodePageModule {}
