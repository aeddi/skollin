import {App, IonicApp, Platform, Events, Loading} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GlobalVars} from './global-vars';
import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';
import {UserPage} from './pages/user/user';
import {PaymentPage} from './pages/payment/payment';
import {HistoryPage} from './pages/history/history';
import {NotificationsPage} from './pages/notifications/notifications';
import {SettingsPage} from './pages/settings/settings';
import {AboutPage} from './pages/about/about';

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

    this.rootPage = LoginPage;

    this.userPage = {component: UserPage};
    this.pages = [
      {title: 'Trouver un lieu', component: TabsPage},
      {title: 'Paiement', component: PaymentPage},
      {title: 'Historique', component: HistoryPage},
      {title: 'Notifications', component: NotificationsPage},
      {title: 'Paramètres', component: SettingsPage},
    ];
    this.aboutPage = {component: AboutPage};

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.mapUnlock();
    let nav = this.app.getComponent('nav');
    let count = 42;
    let menuSwitch = () => {
      try {
        if (nav.getActive().componentType !== page.component) {
          if (page.component === TabsPage) {
            let loading = Loading.create({
              content: "Chargement...",
            });
            nav.present(loading);
            nav.setRoot(TabsPage, {loading: loading});
          }
          else
            nav.setRoot(page.component);
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
