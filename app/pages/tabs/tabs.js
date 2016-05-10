import {Page, NavParams} from 'ionic-angular';
import {MapTabPage} from '../map-tab/map-tab';
import {ListTabPage} from '../list-tab/list-tab';
import {GlobalVars} from '../../global-vars'

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams], [GlobalVars]];
  }
  constructor(navParams, glob) {
    this.glob = glob;
    this.map_tab = MapTabPage;
    this.list_tab = ListTabPage;
    this.glob.setAddress(navParams.get('address'));
  }

  test() {
    console.log('test');
  }
}
