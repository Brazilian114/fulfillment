import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  settings: any[] = [
    { id: 'order', icon: 'newspaper-outline', link: 'order' },
    { id: 'driver', icon: 'person-outline', link: 'driver' },
    { id: 'print-barcode', icon: 'color-palette-outline', link: 'print-barcode' },
    { id: 'order-history', icon: 'settings-outline', link: 'order-history' },
    // { id: 'security', icon: 'lock-closed-outline', link: 'security' },
    // { id: 'privacy', icon: 'hand-left-outline', link: 'privacy' },
    // { id: 'language', icon: 'globe-outline', link: 'blocked' },
    // { id: 'balance', icon: 'wallet-outline', link: 'balance' },
    // { id: 'subscriptions', icon: 'card-outline', link: 'subscriptions' },
    // { id: 'about', icon: 'help-circle-outline', link: 'about' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
