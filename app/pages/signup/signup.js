import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  goBack() {
    this.nav.pop();
  }
}
