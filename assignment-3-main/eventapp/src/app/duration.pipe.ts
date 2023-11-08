import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    let result: string = "";
    if (value < 60) {
      result = value + " mins";
    } 
    else if (value >= 60 && value < 1440) {
      result = Math.floor(value / 60) + " hours " + value % 60 + " mins";
    } 
    else if (value >= 1440) {
      result = Math.floor(value / 1440) + " days " + Math.floor((value % 1440) / 60) + " hours " + value % 60 + " mins";
    }
    return result;
  }
}
