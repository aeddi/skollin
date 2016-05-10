import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the SelDealPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/sel-deal/sel-deal.html',
})
export class SelectedDealPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
