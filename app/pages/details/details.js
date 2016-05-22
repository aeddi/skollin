import {Page, NavParams} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';

@Page({
  templateUrl: 'build/pages/details/details.html',
})
export class DetailsPage {
  static get parameters() {
    return [[GlobalVars], [NavParams]];
  }

  constructor(glob, navParams) {
    let index = navParams.get('index');
    this.infos = glob.pois[index];
  }
}
