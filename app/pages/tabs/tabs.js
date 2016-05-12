import {Page, NavController, NavParams} from 'ionic-angular';
import {MapTabPage} from '../map-tab/map-tab';
import {ListTabPage} from '../list-tab/list-tab';
import {SearchPage} from '../search/search';
import {GlobalVars} from '../../global-vars'

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavController], [NavParams], [GlobalVars]];
  }
  constructor(nav, navParams, glob) {
    this.nav = nav;
    this.glob = glob;
    this.map_tab = MapTabPage;
    this.list_tab = ListTabPage;
    this.glob.address = navParams.get('address');
  }

  goToSearch() {
    this.nav.push(SearchPage);
  }
}
