import {Page, Geolocation, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map/map.html'
})

export class MapPage {
  static get parameters() {
    return [[NavParams]];
  }
  constructor(navParams) {
    this.map = null;
    this.position = navParams.get('position');

    document.addEventListener("load", function() {
      if (this.position === null)
        this.getCurrentPos();
      else
        this.loadMap();
    }, false);
  }

  getCurrentPos() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.loadMap();
      },
      (error) => {
          console.error(error);
      }, options
    );
  }

  loadMap() {
    let mapOptions = {
        center: this.position,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }
}
