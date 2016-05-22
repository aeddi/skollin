import {Page, NavController} from 'ionic-angular';
import {HourFormat} from '../../pipes/hourFormat';
import {GlobalVars} from '../../global-vars';
import {DetailsPage} from '../details/details';

@Page({
  templateUrl: 'build/pages/list-tab/list-tab.html',
  pipes: [HourFormat]
})
export class ListTabPage {
  static get parameters() {
    return [[GlobalVars], [NavController]];
  }

  constructor(glob, nav) {
    this.nav = nav;
    this.glob = glob;
  }

  displayCard(index) {
    this.nav.push(DetailsPage, {index: index});
  }
}
