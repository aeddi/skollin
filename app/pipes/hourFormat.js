import {Pipe} from 'angular2/core';

@Pipe({
  name: 'hourFormat'
})
export class HourFormat {
  transform(value, args) {

    if (isNaN(parseInt(value)))
      return value;

    let hours = Math.floor(value / 60);
    let minutes = value % 60;

    return hours + 'h' + minutes;
  }
}
