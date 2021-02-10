import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPage } from './delivery.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPage
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'driver',
    children:[
      {
        path:'',
        loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule)
      },
      {
        path:'map',
        loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
      }
    ]
    
  },
  {
    path: 'print-barcode',
    loadChildren: () => import('./print-barcode/print-barcode.module').then( m => m.PrintBarcodePageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPageRoutingModule {}
