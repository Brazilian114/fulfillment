import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyParcelsPage } from './my-parcels.page';

const routes: Routes = [
  {
    path: '',
    component: MyParcelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyParcelsPageRoutingModule {}
