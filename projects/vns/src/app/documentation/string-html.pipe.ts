import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'stringHtml'
})
export class StringHtmlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {

    if (!!!value) return this.domSanitizer.bypassSecurityTrustHtml('');

    // replace short src with server map
    let valueNew = value.split("src='/Content/").join("src='https://miukafoto.com/Content/");
    valueNew = valueNew.split('src="/Content/').join('src="https://miukafoto.com/Content/');

    let result: SafeHtml;
    result = this.domSanitizer.bypassSecurityTrustHtml(valueNew.split('||1').join('<').split('2||').join('>'));

    return result;
  }

}
