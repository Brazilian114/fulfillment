import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {
  explores: any[] = [
    { id: 'check_price', icon: 'logo-bitcoin', color: 'primary', link: 'check-price' },
    // { id: 'music_title', icon: 'musical-notes', color: 'primary', link: 'music' },
    { id: 'my_parcels_title', icon: 'cube-outline', color: 'primary', link: 'my-parcels' },
    { id: 'delivery_title', icon: 'car-outline', color: 'primary', link: 'delivery' },
    { id: 'help', icon: 'bulb-outline', color: 'primary', link: 'stickers' },
    // { id: 'videos_title', icon: 'play-circle-outline', color: 'primary', link: 'videos' },
    // { id: 'live_streams_title', icon: 'ellipse-outline', color: 'warning', link: 'live_streams' },
    // { id: 'shopping_title', icon: 'cart-outline', color: 'warning', link: 'shopping' },
    // { id: 'podcasts_title', icon: 'headset-outline', color: 'warning', link: 'podcasts' }
  ];

  constructor() { }

  /**
   * On refresh
   */
  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit(): void {}
}
