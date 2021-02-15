import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckPricePage } from './check-price.page';

const routes: Routes = [
  {
    path: '',
    component: CheckPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckPricePageRoutingModule {}
