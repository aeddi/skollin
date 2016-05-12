import {Page, Geolocation} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';

const defaultZoom = 15;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab-native/map-tab-native.html',
})
export class MapTabNativePage {
  static get parameters() {
    return [[GlobalVars]];
  }
  constructor(glob) {
    this.map = null;
    this.glob = glob;
    this.centerMarker = null;
  }

  onPageLoaded() {
		this.initMap();

    if (this.glob.address === null) {
      this.glob.address = 'My position';
      this.setCurrentPos();
    }
    else {
      this.setAddress();
    }
  }

  initMap() {
    let startPos = (this.glob.coords !== null) ? this.glob.coords : defaultPos;
    let mapOptions = {
      mapType: plugin.google.maps.MapTypeId.ROADMAP,
      camera: {
        latLng: startPos,
        zoom: defaultZoom
      }
    };

    let div = document.getElementById("map");
    this.map = plugin.google.maps.Map.getMap(div, mapOptions);
  }

  setCurrentPos() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.glob.coords = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.updateCenter();
      },
      (error) => {
        console.error(error);
      }, options
    );
  }

  setAddress() {
    let geocoder = new plugin.google.maps.Geocoder();
    let coords = geocoder.geocode({'address': this.glob.address},
      (results, status) => {
        if (results.length) {
          this.glob.coords = results[0].position;
          this.updateCenter();
        }
        else {
          this.glob.address = 'Unknown address';
        }
      });
  }

  updateCenter() {
    if (this.centerMarker !== null) {
      this.centerMarker.remove();
    }

    this.map.animateCamera({
      target: this.glob.coords,
      zoom: defaultZoom
    }, () => {
    	this.centerMarker = this.map.addMarker({
    	  animation: plugin.google.maps.Animation.DROP,
    	  position: this.glob.coords
    	});
    });
  }
}
