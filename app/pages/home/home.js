import {Page, NavController, Alert} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
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

    this.initSearchPlaces();
  }

  initSearchPlaces() {

  }

  goToMap(address) {
    this.nav.push(TabsPage, {address: address});
  }

  goToUserProfile() {
    this.nav.push(UserPage);
  }

  goToSelectedDeal() {
    this.nav.push(SelectedDealPage);
  }
}
