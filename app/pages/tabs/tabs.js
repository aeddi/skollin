import {Page, NavController} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';
import {MapTabNativePage} from '../map-tab-native/map-tab-native';
import {MapTabJsPage} from '../map-tab-js/map-tab-js';
import {ListTabPage} from '../list-tab/list-tab';
import {SearchPage} from '../search/search';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavController], [GlobalVars]];
  }
  constructor(nav, glob) {
    this.nav = nav;
    this.glob = glob;
    this.list_tab = ListTabPage;
		if (window.plugin === undefined)
			this.map_tab = MapTabJsPage;
		else
			this.map_tab = MapTabNativePage;
  }

  goToSearch() {
    this.nav.push(SearchPage);
  }
}
