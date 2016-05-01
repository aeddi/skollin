import {Page, NavController} from 'ionic-angular';
import {MapPage} from '../map/map';

const currentLabel = "Use current position"
const addressLabel = "Use this address"

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]]
  }

  constructor(nav) {
    this.nav = nav;

    this.searchQuery = ''
    this.buttonLabel = currentLabel
  }

  searchBarInput(e) {
//    if (this.searchQuery == '')
//      this.buttonLabel = currentLabel
//    else
//      this.buttonLabel = addressLabel
  }

  goToMap() {
    this.nav.push(MapPage, {HomePage: this})
  }
}
