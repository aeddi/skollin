import {Page} from 'ionic-angular';
import {GlobalVars} from '../../global-vars';
import {Focuser} from '../../directives/autofocus-searchbar'

@Page({
  templateUrl: 'build/pages/search/search.html',
  directives: [Focuser]
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
