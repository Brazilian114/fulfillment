import { Component, OnInit , ViewChild, ElementRef, NgZone} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  // @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
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
      title: "Similan",
      latitude: "13.665788972830791",
      longitude: "100.65389651189325",
      qty: "10"
    }
  ];
  latitude: number;
  longitude: number;
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
   // private modalCtrl: ModalController,
    public zone: NgZone,
    public androidPermissions:AndroidPermissions,
    public locationAccuracy:LocationAccuracy
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
    // this.checkGPSPermission();
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
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.loadMap();
        // alert("Yeaaaaa")
        // When GPS Turned ON call method to get Accurate location coordinates
        // this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
  addInfoWindowToMarker(marker) {

    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    // let infoWindowContent = '<div id="content" >' +
    //   '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
    //   '<p>Latitude : ' + marker.latitude + '</p>' +
    //   '<p>Longitude : ' + marker.longitude + '</p>' +
    //   '</div>';

    // let infoWindow = new google.maps.infoWindow({
    //   content: infoWindowContent
    // });

    // marker.addListener('click', () => {
    //   this.closeAllInfoWindows();
    //   infoWindow.open(this.map, marker);
    // });
    // this.infoWindows.push(infoWindow);
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
  loadMap() {

    //FIRST GET THE LOCATION FROM THE DEVICE.
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      //LOAD THE MAP WITH THE PREVIOUS VALUES AS PARAMETERS.
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

//   loadMap() {
//     this.geolocation.getCurrentPosition().then((resp) => {
// console.log(resp);

//       this.latitude = resp.coords.latitude;
//       this.longitude = resp.coords.longitude;

//       let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
//       let mapOptions = {
//         center: latLng,
//         zoom: 12,
//         disableDefaultUI: true,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       }

//       this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

//       this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
//       // this.addInfoWindowToMarker(this.makers);
//       // this.addMarker(this.makers);
//       // 
//       this.makers.push({'title':"My Location",'latitude':this.latitude,'longitude':this.longitude})
//       this.addMarkersToMap(this.makers);
//       // this.addMaker(13.580838510900056, 100.6746724531358);
//       this.map.addListener('dragend', () => {

//         this.latitude = this.map.center.lat();
//         this.longitude = this.map.center.lng();

//         this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
//       });



//     }).catch((error) => {
//       console.log('Error getting location', error);
//     });
//   }  
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

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  addMarkersToMap(markers) {
    console.log(markers);

    for (let marker of markers) {

      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      for (let marker of markers) {
        var position = new google.maps.LatLng(marker.latitude, marker.longitude);
        var dogwalkMarker = new google.maps.Marker({
          position: position,
           title: marker.title,
          icon:{
            url:'assets/img/markers.png',
            scaledSize: new google.maps.Size(40, 40),
   
        },
        })
        google.maps.event.addListener(dogwalkMarker, 'click',  ()=> {
          console.log(dogwalkMarker);
          
          console.log(marker.title);
          //  this.presentModal(marker.title);
          // this.navCtrl.navigateForward('parking-details');
          // this.infowindow.open(marker.title);
        //   const modal = await this.modalCtrl.create({
        //     component: MePagePage,
        //     componentProps: { value: marker.title }
        //   });
        //   await modal.present();
        });
        

      }
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker);
    }

    // for (let marker of markers) {
    //   var position = new google.maps.LatLng(marker.latitude, marker.longitude);
    //   var dogwalkMarker = new google.maps.Marker({
    //     position: position,
    //     title: marker.name,
    //     icon: 'assets/img/markers.png'
    //   });
    //   dogwalkMarker.setMap(this.map);
    //   this.addInfoWindowToMarker(dogwalkMarker);
    // }
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
  ShowCords() {
    alert('lat' + this.lat + ', long' + this.long)
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
