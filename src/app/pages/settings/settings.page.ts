import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings: any[] = [
    
    { id: 'account', icon: 'person-outline', link: 'account' },
    // { id: 'notifications', icon: 'notifications-outline', link: 'notifications' },
    { id: 'my_address', icon: 'map-outline', link: 'appearance' },
    { id: 'receiver_address', icon: 'navigate-outline', link: 'general' },
    // { id: 'security', icon: 'lock-closed-outline', link: 'security' },
    // { id: 'privacy', icon: 'hand-left-outline', link: 'privacy' },
    { id: 'language', icon: 'globe-outline', link: 'blocked' },
    // { id: 'balance', icon: 'wallet-outline', link: 'balance' },
    // { id: 'subscriptions', icon: 'card-outline', link: 'subscriptions' },
    { id: 'about', icon: 'help-circle-outline', link: 'about' }
  ];

  constructor(public navCtrl:NavController,public storage:Storage) { }

  ngOnInit() {
  }
  Logout(){
    this.navCtrl.navigateRoot("/auth/login");
    this.storage.remove('_user');
  }
}
