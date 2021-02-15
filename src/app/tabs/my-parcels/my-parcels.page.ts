import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-parcels',
  templateUrl: './my-parcels.page.html',
  styleUrls: ['./my-parcels.page.scss'],
})
export class MyParcelsPage implements OnInit {

  constructor(public storage : Storage) { 

  }

  ngOnInit() {
  }

}
