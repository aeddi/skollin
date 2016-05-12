import {Page} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';

@Page({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {
  static get parameters() {
    return [[GlobalVars]];
  }
  constructor(glob) {
    this.glob = glob;
    this.searchQuery = this.glob.address;
  }
}
