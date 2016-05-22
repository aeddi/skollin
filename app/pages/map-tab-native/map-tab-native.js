import {Page, Events, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GlobalVars} from '../../global-vars';

const defaultZoom = 16;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab-native/map-tab-native.html',
})
export class MapTabNativePage {
  static get parameters() {
    return [[GlobalVars], [Events], [NavController], [NavParams]];
  }
  constructor(glob, events, nav, navParams) {
    this.nav = nav;
    this.glob = glob;
    this.centerMarker = null;
    this.loading = navParams.data;

    events.subscribe('mapUnlock', (bool) => {
      this.toggleMapLock(bool[0]);
    });
    events.subscribe('locateUser', () => {
      this.setCurrentPos();
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

    if (this.glob.coords === null) {
      this.setCurrentPos();
    }
    else {
      document.getElementById('map-input').value = this.glob.address;
      this.updateCenter();
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
      if (this.loading !== undefined) {
        setTimeout(() => {
          this.loading.dismiss()
        }, 1000);
      }
    });
  }

  initSearchBox() {
    let inputDiv = document.getElementById('map-input');
    let options = {
      types: ['geocode']
    };
    this.searchBox = new google.maps.places.Autocomplete(inputDiv, options);

    this.map.on(plugin.google.maps.event.CAMERA_CHANGE, (pos) => {
      this.map.getVisibleRegion((bounds) => {
        let jsBounds = new google.maps.LatLngBounds(bounds.southwest, bounds.northeast);
        this.searchBox.setBounds(jsBounds);
      });
    });

    this.searchBox.addListener('place_changed', () => {
      this.glob.address = inputDiv.value;
      let place = this.searchBox.getPlace();
      if (!place.geometry)
        return;
      else {
        let jsCoords = place.geometry.location;
        this.glob.coords = new plugin.google.maps.LatLng(jsCoords.lat(), jsCoords.lng());
        this.updateCenter();
      }
    });

    inputDiv.addEventListener('focus', () => {
      this.toggleMapLock(false);
      inputDiv.value = '';

      let count = 840;
      let removeLogo = () => {
        let dropDownDiv = document.getElementsByClassName('pac-container')[0];
        if (dropDownDiv === undefined && count--)
          setTimeout(removeLogo, 42);
        else
          dropDownDiv.className = dropDownDiv.className.replace(/\bpac-logo\b/,'');
      };
      removeLogo();
    });
    inputDiv.addEventListener('blur', () => {
      this.toggleMapLock(true);
      setTimeout(() => {
        inputDiv.value = this.glob.address;
      }, 142);
    });
  }

  setCurrentPos() {
    document.getElementById("map-input").value = this.glob.address = "Ma position"
    let options = {timeout: 10000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(options).then((pos) => {
        this.glob.coords = new plugin.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.updateCenter();
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
    	this.map.addMarker({
    	  animation: plugin.google.maps.Animation.DROP,
    	  position: this.glob.coords
    	}, (marker) => {
        this.centerMarker = marker;
      });
    });
  }
}
