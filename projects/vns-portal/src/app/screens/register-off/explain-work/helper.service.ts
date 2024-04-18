import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  /*
    coppied from the internet, need to be checked or improved
  */
  isDeepEqual(object1: any, object2: any): boolean {

    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) return false;

    for (var key of objKeys1) {
      const value1 = object1[key];
      const value2 = object2[key];

      const isObjects = this.isObject(value1) && this.isObject(value2);

      if ((isObjects && !this.isDeepEqual(value1, value2)) ||
        (!isObjects && value1 !== value2)
      ) {
        return false;
      }
    }
    return true;
  };

  private isObject(object: any): boolean {
    return object != null && typeof object === "object";
  };

  /**
  * Returns a random number between min (inclusive) and max (exclusive)
  */
  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  numberTo2digitString(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  generatePhoneNumber(length: number): string {
    let result = '';
    for (let i=0; i< length; i++) {
      result += (i===4 || i===7 ? ' ' : '') + this.getRandomInt(0, 9).toString();
    }
    return result;
  }

  generateRandomEmail(prefixLength: number): string {
    let result = '';
    for (let i=0; i< prefixLength; i++) {
      result += this.getRandomInt(0, 9).toString();
    }
    return result + '@email.com';
  }

}
