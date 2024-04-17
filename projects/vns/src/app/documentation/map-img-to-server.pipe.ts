import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapImgToServer'
})
export class MapImgToServerPipe implements PipeTransform {

  constructor() { }

  transform(value: string): string {
    let result: string = '';
    console.log("MapImgToServerPipe", value)
    if (!!!value || value === '-') {
      
    } else if (value.includes('http://www.miukafoto.com' || value.includes('http://miukafoto.com'))) {
      result = value.replace('http://', 'https://')
    } else if (value.includes('://')) {
      result = value;
    } else if (!!!value.includes('/')) {
      result = 'https://miukafoto.com/Content/shared_pictures/' + value;
    } else {
      result = `https://miukafoto.com${value}`;
    }
    return result;

  }
}