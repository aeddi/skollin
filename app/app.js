import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//import {HomePage} from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';
import {GlobalVars} from './global-vars';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [GlobalVars],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = TabsPage;
      StatusBar.styleDefault();
    });
  }
}
