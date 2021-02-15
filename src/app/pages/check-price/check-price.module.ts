import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckPricePageRoutingModule } from './check-price-routing.module';

import { CheckPricePage } from './check-price.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckPricePageRoutingModule
  ],
  declarations: [CheckPricePage]
})
export class CheckPricePageModule {}
