import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ListTabPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/list-tab/list-tab.html',
})
export class ListTabPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
