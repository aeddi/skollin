import {Injectable} from 'angular2/core';

@Injectable()
export class GlobalVars {

  constructor() {
    this.lastPos = null;
  }

  setLastPos(value) {
    this.lastPos = value;
  }

  getLastPos() {
    return this.lastPos;
  }

}
