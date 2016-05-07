import {Page, NavController, Alert} from 'ionic-angular';
import {MapPage} from '../map/map';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.searchQuery = '';
    this.buttonLabel = "Use current position";

    this.initSearchPlaces();
  }

  initSearchPlaces() {

  }

  goToMap(address) {
    if (address) {
      let nav = this.nav;
      let geocoder = new google.maps.Geocoder();
      let coords = geocoder.geocode({'address': this.searchQuery}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          nav.push(MapPage, {position: results[0].geometry.location});
        }
        else {
          let alert = Alert.create({
            title: "Address not found",
            subTitle: status,
            buttons: ['OK']
          });
          nav.present(alert);
        }
      });
    }
    else {
      this.nav.push(MapPage, {position: null});
    }
  }
}
