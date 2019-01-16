# NumberToPersian
Convert numbers to Persian letters in Angular Pipe

این برنامه از پروژه
https://github.com/mahmoud-eskandari/NumToPersian
الگوبرداری کرده است و آن را در آنگولار به کاربرده است

Pipe آنگولار برای تبدیل اعداد به حروف
برای مثال

```javascript
<h2>اعداد را وارد نمایید: </h2>
Price <input type="number" [(ngModel)]="price">
{{price | numberToPersian}}
```
که باعث تبدیل اعداد وارد شده به اعداد تا 16 رقم میود

![alt text](https://raw.githubusercontent.com/EbrahimHamzeh/NumberToPersian/master/demo.gif)
