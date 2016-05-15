import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.login = '';
    this.pass = '';
  }

  goToHome() {
    let labId = document.getElementById('lbl-6');
    let labPass = document.getElementById('lbl-7');

    if (this.login !== 'test' || this.pass !== 'test') {
      if (this.login !== 'test')
        labId.style.color = 'red';
      else
        labId.style.color = '#e1d7d6';
      if (this.pass !== 'test')
        labPass.style.color = 'red';
      else
        labPass.style.color = '#e1d7d6';
    }
    else
      this.nav.setRoot(TabsPage, {}, {animate: true});
  }
}
