import {Page, Geolocation, Events, NavController} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';

const defaultZoom = 15;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab-js/map-tab-js.html'
})
export class MapTabJsPage {
  static get parameters() {
    return [[GlobalVars], [Events], [NavController]];
  }
  constructor(glob, events, nav) {
    this.nav = nav;
    this.glob = glob;
    this.centerMarker = null;

    events.subscribe('locateUser', () => {
      this.setCurrentPos(true);
    });
  }

  onPageLoaded() {
		this.initMap();
		this.initSearchBox();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      window.dispatchEvent(new Event('resize'))
      if (this.glob.address === null) {
        this.glob.address = 'Ma position';
        this.setCurrentPos(false);
      }
      else {
        this.setAddress();
        document.getElementById('map-input').value = this.glob.address;
      }
    });
  }

  initMap() {
    let startPos = (this.glob.coords !== null) ? this.glob.coords : defaultPos;
    let mapOptions = {
        center: startPos,
        zoom: defaultZoom,
        disableDefaultUI: true,
        streetViewControl: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    let mapDiv = document.getElementById("map");
    this.map = new google.maps.Map(map, mapOptions);

    let inputDiv = document.getElementById("map-input");
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputDiv);
  }

  initSearchBox() {
    let inputDiv = document.getElementById('map-input');
    this.searchBox = new google.maps.places.SearchBox(inputDiv);

    let count = 420;
    let removeLogo = () => {
      let dropDownDiv = document.getElementsByClassName('pac-container')[0];
      if (dropDownDiv === undefined && count--)
        setTimeout(removeLogo, 24);
      else
        dropDownDiv.className = dropDownDiv.className.replace(/\bpac-logo\b/,'');
    };
    removeLogo();

    this.map.addListener('bounds_changed', () => {
      this.searchBox.setBounds(this.map.getBounds());
    });

    this.searchBox.addListener('places_changed', () => {
      this.glob.address = inputDiv.value;
      this.setAddress();
    });
  }

  setCurrentPos(changeInput) {
    if (changeInput) {
      let inputDiv = document.getElementById("map-input");
      inputDiv.value = "Ma position"
    }
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

  goToSearch() {
    this.nav.push(SearchPage);
  }
}
