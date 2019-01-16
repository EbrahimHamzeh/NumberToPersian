/**
 * Name:Angular Pipe Number To Persian Convertor.
 * Author:Ebrahim Hamzeh
 * Copyright:2019
 * Licence: GNU Licence 2.4
 * version:0.10.0
 * Email:pranc14@gmail.com
 * coded with ♥ for evryone
 **/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToPersian'
})
export class NumberToPersianPipe implements PipeTransform {
  private spliter = ' و ';
  private zero = 'صفر';
  private Letters = [
    ['', 'یك', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
    ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    ['', 'یكصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
    ['', ' هزار ', ' میلیون ', ' میلیارد ', ' بیلیون ', ' بیلیارد ', ' تریلیون ', ' تریلیارد ',
      ' کوآدریلیون ', ' کادریلیارد ', ' کوینتیلیون ', ' کوانتینیارد ', ' سکستیلیون ', ' سکستیلیارد ', ' سپتیلیون ',
      ' سپتیلیارد ', ' اکتیلیون ', ' اکتیلیارد ', ' نانیلیون ', ' نانیلیارد ', ' دسیلیون ', ' دسیلیارد ']
  ];

  ThreeNumbersToLetter(num) {
    // return zero
    if (parseInt(num, 0) === 0) {
      return '';
    }
    const parsedInt = parseInt(num, 0);
    if (parsedInt < 10) {
      return this.Letters[0][parsedInt];
    }
    if (parsedInt <= 20) {
      return this.Letters[1][parsedInt - 10];
    }
    if (parsedInt < 100) {
      // tslint:disable-next-line:no-shadowed-variable
      const one = parsedInt % 10;
      // tslint:disable-next-line:no-shadowed-variable
      const ten = (parsedInt - one) / 10;
      if (one > 0) {
        return this.Letters[2][ten] + this.spliter + this.Letters[0][one];
      }
      return this.Letters[2][ten];
    }
    const one = parsedInt % 10;
    const hundreds = (parsedInt - parsedInt % 100) / 100;
    const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
    const out = [this.Letters[3][hundreds]];
    const SecendPart = ((ten * 10) + one);
    if (SecendPart > 0) {
      if (SecendPart < 10) {
        out.push(this.Letters[0][SecendPart]);
      } else if (SecendPart <= 20) {
        out.push(this.Letters[1][SecendPart - 10]);
      } else {
        out.push(this.Letters[2][ten]);
        if (one > 0) {
          out.push(this.Letters[0][one]);
        }
      }
    }
    return out.join(this.spliter);
  }

  PrepareNumber(num) {
    if (typeof num === 'number') {
      num = num.toString();
    }
    const NumberLength = num.length % 3;
    if (NumberLength === 1) {
      num = '00' + num;
    } else if (NumberLength === 2) {
      num = '0' + num;
    }
    // Explode to array
    return num.replace(/\d{3}(?=\d)/g, '$&*').split('*');
  }

  transform(value: any, args?: any): any {
    if (value === 0) {
      return this.zero;
    }

    if (value.length > 66) {
      return 'خارج از محدوده';
    }

    const SplitedNumber = this.PrepareNumber(value);

    const funcout: any = [];
    const SplitLength = SplitedNumber.length;

    for (let i = 0; i < SplitLength; i++) {
      const SectionTitle = this.Letters[4][SplitLength - (i + 1)];
      const converted = this.ThreeNumbersToLetter(SplitedNumber[i]);
      if (converted !== '') {
        funcout.push(converted + SectionTitle);
      }
    }
    return funcout.join(this.spliter);
  }

}
