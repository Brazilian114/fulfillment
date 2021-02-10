import { Component, OnInit , ViewChild, ElementRef, NgZone} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  @ViewChild('search', { static: false })
  // @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address:string;
  lat: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  infoWindows: any = [];
  placeid: any;
  GoogleAutocomplete: any;
  makers: any = [
    {
      title: "บริษัท พีเอสเอส กรุ๊ป ประเทศไทย จำกัด",
      latitude: "13.629689677620364",
      longitude: "100.60486100000001",
      qty: "10"
    },
    {
      title: "PSS 2",
      latitude: "13.595213323541628",
      longitude: "100.66086097050413",
      qty: "10"
    }
  ];
  latitude: number;
  longitude: number;
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
   // private modalCtrl: ModalController,
    public zone: NgZone,
    // private mapsAPILoader: MapsAPILoader,
    //public platform: Platform
) { 
  this.infoWindows = [];
  // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  this.autocomplete = { input: '' };
  this.autocompleteItems = [];

    }
    
  

  
  ngOnInit() {
    // this.loadMap();  
  }
  ionViewDidEnter() {
    this.loadMap();
  }
  // async SearchClick()
  // {
  //   console.log('test SearchClick')

  //   const modal = await this.modalCtrl.create({
  //     component: SearchModalPagePage,
  //     componentProps : {}
  //   });
  //   await modal.present();
  // }

  addInfoWindowToMarker(marker) {

    // console.log(marker);
    let infoWindowContent = '<div id="content" >' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>position : ' + marker.position + '</p>' +
      '<button ion-button block (click)="openMapsApp()">นำทาง</button>' +
      '</div>';

    //<button ion-button block (click)="doGetClient()">ลูกค้า</button>
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      console.log(marker);
      // this.loadModal(marker.title);
      this.closeAllInfoWindows();
      // infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }
  async loadModal(maker) {
    console.log('loadModal' + maker);

    // const modal = await this.modalCtrl.create({
    //   component: DetailsModalPage,
    //   componentProps: { 'para1': maker },
    //   cssClass: 'my-modal-component-css'
    // })

    // return await modal.present();
    //const modalData = await modal.onWillDismiss();

    //return await modal.present();
  }
  async loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 12,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }



      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

      this.addMarkersToMap(this.makers);
      // this.addMaker(13.580838510900056, 100.6746724531358);
      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  addMarker(map) {

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    // google.maps.event.addListener(marker, 'click', () => {
    //   infoWindow.open(this.map, marker);
    // });
  }
  addMarkersToMap(markers) {

    for (let marker of markers) {

      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      for (let marker of markers) {
        var position = new google.maps.LatLng(marker.latitude, marker.longitude);
        var dogwalkMarker = new google.maps.Marker({
          position: position,
          title: marker.title,
          icon: {
            url: 'assets/img/markers.png',
            scaledSize: new google.maps.Size(80, 80)
          },
        });
        dogwalkMarker.setMap(this.map);
        this.addInfoWindowToMarker(dogwalkMarker);
      }
      // dogwalkMarker.setMap(this.map);
      // this.addInfoWindowToMarker(dogwalkMarker);
    }

  }

  UpdateSearchResults() {
    console.log('test' + this.autocomplete.input);
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  SelectSearchResult(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    alert(JSON.stringify(item))
    this.placeid = item.place_id
  }

  ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    // GoTo(){
    //   return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
    // }

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }




  openMapsApp() {
    console.log('test 1 ');
  }








}
