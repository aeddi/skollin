import {Page, Geolocation} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  constructor() {
    this.map = null;
    this.loadMap();
  }

  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
          });
      },

      (error) => {
          console.log(error);
      }, options
    );
  }

}
