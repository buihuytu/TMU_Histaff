import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postDateTime'
})
export class PostDateTimePipe implements PipeTransform {

  transform(input: Date): string {
    let value = input
    if (typeof input === 'string') value = new Date(input);
    let year = value.getFullYear();
    let month: number | string = value.getMonth() + 1;
    let day: number | string = value.getDate();
    let hour: number | string = value.getHours();
    let minute: number | string = value.getMinutes();
    let ampm = hour <= 11 ? 'AM' : 'PM';

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 13 ? hour : hour - 12;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    return `${day}/${month}/${year} ${hour}:${minute} ${ampm}`;
  }

}
