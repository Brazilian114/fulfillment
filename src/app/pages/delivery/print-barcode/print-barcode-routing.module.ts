import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintBarcodePage } from './print-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: PrintBarcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBarcodePageRoutingModule {}
