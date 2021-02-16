import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from '../pages/settings/notifications/other/services/services.component';
import { WebServiceService } from '../services/service/web-service.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.page.html',
  styleUrls: ['./search-location.page.scss'],
})
export class SearchLocationPage implements OnInit {
items;
  constructor(public service:WebServiceService) { }

  ngOnInit() {
    this.getLocation();
  }
  getLocation(){
    this.service.GetLocation().subscribe(data=>{
      console.log(data);
      this.items = data
    })
  
  }
}
