import {Page, Geolocation, NavParams, NavController, Alert} from 'ionic-angular';
import {GlobalVars} from '../../global-vars'

const defaultZoom = 15;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map/map.html'
})

export class MapPage {
  static get parameters() {
    return [[NavController], [NavParams], [GlobalVars]];
  }
  constructor(nav, navParams, glob) {
    this.nav = nav;
    this.glob = glob;
    this.centerMarker = null;
    this.address = navParams.get('address');
  }

  onPageLoaded() {
		this.initMap();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      window.dispatchEvent(new Event('resize'))
      if (this.address === null) {
        this.setCurrentPos();
      }
      else {
        this.setAddress();
      }
    });
  }

  initMap() {
    let startPos = (this.glob.getLastPos() !== null) ? this.glob.getLastPos() : defaultPos;
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
        this.glob.setLastPos(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        this.updateCenter();
      },
      (error) => {
        console.error(error);
      }, options
    );
  }

  setAddress() {
    let geocoder = new google.maps.Geocoder();
    let coords = geocoder.geocode({'address': this.address},
      (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.glob.setLastPos(results[0].geometry.location);
          this.updateCenter();
        }
        else {
          let alert = Alert.create({
            title: "Address not found",
            subTitle: status,
            buttons: ['OK']
          });
          this.nav.present(alert);
        }
      });
  }

  updateCenter() {
    this.map.panTo(this.glob.getLastPos());
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
