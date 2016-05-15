import {Page, Events, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GlobalVars} from '../../global-vars';

const defaultZoom = 15;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab-native/map-tab-native.html',
})
export class MapTabNativePage {
  static get parameters() {
    return [[GlobalVars], [Events], [NavController]];
  }
  constructor(glob, events, nav) {
    this.nav = nav;
    this.map = null;
    this.glob = glob;
    this.centerMarker = null;

    events.subscribe('mapUnlock', (bool) => {
      this.toggleMapLock(bool[0]);
    });
  }

  toggleMapLock(bool) {
    let count = 42;
    let toggle = () => {
      try {
        if (this.glob.lastLock !== bool) {
          this.map.setClickable(bool);
          this.glob.lastLock = bool;
        }
      }
      catch(e) {
        console.error(e);
        if (count-- && bool)
          setTimeout(toggle, 42);
      }
    };
    toggle();
  }

  onPageLoaded() {
		this.initMap();
		this.initSearchBox();

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
        zoom: defaultZoom,
      }
    };

    let div = document.getElementById("map");
    this.map = plugin.google.maps.Map.getMap(div, mapOptions);
    this.map.on(plugin.google.maps.event.MAP_READY, () => {
      this.toggleMapLock(true);
    });
  }

  initSearchBox() {
    let div = document.getElementById('map-input').childNodes[0];
    this.searchBox = new google.maps.places.SearchBox(div);

    div.addEventListener('focusin', () => {
      this.toggleMapLock(false);
    });
    div.addEventListener('focusout', () => {
      this.toggleMapLock(true);
    });
  }

  setCurrentPos() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(options).then((pos) => {
        this.glob.coords = new plugin.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.updateCenter();
    });
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
      zoom: defaultZoom,
      duration: 500
    }, () => {
    	this.centerMarker = this.map.addMarker({
    	  animation: plugin.google.maps.Animation.DROP,
    	  position: this.glob.coords
    	});
    });
  }

  goToSearch() {
    this.nav.push(SearchPage);
  }
}
