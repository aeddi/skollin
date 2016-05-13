import {Injectable} from 'angular2/core';

@Injectable()
export class GlobalVars {
  constructor() {
    this.coords = null;
    this.address = null;
    this.tabsNav = null;
    this.lastLock = null;
  }
}
