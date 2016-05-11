import {Injectable} from 'angular2/core';

@Injectable()
export class GlobalVars {

  constructor() {
    this.coords = null;
    this.address = null;
    this.tabsNav = null;
  }

  setCoords(value) {
    this.coords = value;
  }
  getCoords() {
    return this.coords;
  }

  setAddress(value) {
    this.address = value;
  }
  getAddress() {
    return this.address;
  }

  setTabsNav(value) {
    this.tabsNav = value;
  }
  getTabsNav() {
    return this.tabsNav;
  }
}
