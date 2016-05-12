import {Page, Geolocation, NavController, Alert} from 'ionic-angular';
import {GlobalVars} from '../../global-vars'

const defaultZoom = 15;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab/map-tab.html'
})

export class MapTabPage {
  static get parameters() {
    return [[NavController], [GlobalVars]];
  }
  constructor(nav, glob) {
    this.nav = nav;
    this.glob = glob;
    this.centerMarker = null;
  }

  onPageLoaded() {
		this.initMap();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      window.dispatchEvent(new Event('resize'))
      if (this.glob.address === null) {
        this.glob.address = 'My position';
        this.setCurrentPos();
      }
      else {
        this.setAddress();
      }
    });
  }

  initMap() {
    let startPos = (this.glob.coords !== null) ? this.glob.coords : defaultPos;
    let mapOptions = {
        center: startPos,
        zoom: defaultZoom,
//        disableDefaultUI: true,
//        mapTypeControl: true,
//        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

  setCurrentPos() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.glob.coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.updateCenter();
      },
      (error) => {
        console.error(error);
      }, options
    );
  }

  setAddress() {
    let geocoder = new google.maps.Geocoder();
    let coords = geocoder.geocode({'address': this.glob.address},
      (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.glob.coords = results[0].geometry.location;
          this.updateCenter();
        }
        else {
          this.glob.address = 'Unknown address';
//          let alert = Alert.create({
//            title: "Address not found",
//            subTitle: status,
//            buttons: ['OK']
//          });
//          this.nav.present(alert);
        }
      });
  }

  updateCenter() {
    this.map.panTo(this.glob.coords);
    this.map.setZoom(defaultZoom);

    if (this.centerMarker !== null) {
      this.centerMarker.setMap(null);
    }

  	this.centerMarker = new google.maps.Marker({
  	  map: this.map,
  	  animation: google.maps.Animation.DROP,
  	  position: this.map.getCenter()
  	});
  }

}
