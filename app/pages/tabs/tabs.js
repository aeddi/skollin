import {Page, NavController, Events} from 'ionic-angular';
import {Keyboard} from 'ionic-native';
import {GlobalVars} from '../../global-vars';
import {MapTabNativePage} from '../map-tab-native/map-tab-native';
import {MapTabJsPage} from '../map-tab-js/map-tab-js';
import {ListTabPage} from '../list-tab/list-tab';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavController], [GlobalVars], [Events]];
  }
  constructor(nav, glob, events) {
    this.nav = nav;
    this.glob = glob;
    this.events = events;
    this.list_tab = ListTabPage;

		if (this.nativePluginIsAvailable())
			this.map_tab = MapTabNativePage;
		else
			this.map_tab = MapTabJsPage;
  }

  onPageLoaded() {
    let tabs = document.getElementsByTagName('ion-tabbar-section')[0];

    window.addEventListener('native.keyboardshow', () => {
      tabs.style.display = 'none';
    });
    window.addEventListener('native.keyboardhide', () => {
      tabs.style.display = 'block';
    });
  }

	nativePluginIsAvailable() {
		if (window.plugin === undefined)
			return false;
		if (window.plugin.google === undefined)
			return false;
		if (window.plugin.google.maps === undefined)
			return false;
		return true
	}

  locateUser() {
    this.events.publish('locateUser');
  }

  mapLock() {
    this.events.publish('mapUnlock', false);
  }
}
