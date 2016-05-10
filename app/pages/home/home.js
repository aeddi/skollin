import {Page, NavController, Alert} from 'ionic-angular';
import {MapPage} from '../map/map';
import {UserPage} from '../user/user';
import {SelectedDealPage} from '../sel-deal/sel-deal';

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

    this.count = 42;
    this.initSearchPlaces();
  }

  initSearchPlaces() {

  }

  goToMap(address) {
    this.nav.push(MapPage, {address: address});
    this.count++;
  }

  goToUserProfile() {
    this.nav.push(UserPage);
  }

  goToSelectedDeal() {
    this.nav.push(SelectedDealPage);
  }
}
