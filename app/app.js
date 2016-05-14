import {App, IonicApp, Platform, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SelectedDealPage} from './pages/sel-deal/sel-deal';
import {UserPage} from './pages/user/user';
import {GlobalVars} from './global-vars';

@App({
  templateUrl: 'build/app.html',
  providers: [GlobalVars],
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  prodMode: true
})
export class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [Events]];
  }

  constructor(app, platform, events) {
    this.app = app;
    this.events = events;
    this.pages = [
      {title: 'Find a bar', component: TabsPage},
      {title: 'My selection', component: SelectedDealPage},
      {title: 'My account', component: UserPage},
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = TabsPage;
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.mapUnlock();
    let nav = this.app.getComponent('nav');
    let count = 42;
    let menuSwitch = () => {
      try {
        console.log('isDiff?');
        if (nav.getActive().componentType !== page.component) {
          console.log('yes');
          nav.setRoot(page.component);
        }
        else {
          console.log('no');
        }
      }
      catch(e) {
        console.error(e);
        if (count--)
          setTimeout(menuSwitch, 42);
      }
    };
    menuSwitch();
  }

  mapUnlock() {
    this.events.publish('mapUnlock', true);
  }
}
