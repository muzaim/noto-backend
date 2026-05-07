import { Injectable, ValidationError } from '@nestjs/common';

@Injectable()
export class HelperService {
  /**
   * Safely extract string value from Excel cell
   * Handles formulas, rich text, hyperlinks, and objects
   */
  async convertErrorValidator(error: ValidationError[]) {
    const errorString: string[] = [];
    if (error.length > 0) {
      for (let index = 0; index < error.length; index++) {
        const element = error[index];
        if (element.constraints) {
          for (const [key, value] of Object.entries(element.constraints)) {
            errorString.push(value);
          }
        }
        if (element.children) {
          for (let index = 0; index < element.children.length; index++) {
            const elementX = element.children[index];
            if (elementX.constraints) {
              for (const [key, value] of Object.entries(elementX.constraints)) {
                errorString.push(value);
              }
            }
          }
        }
      }
    }
    return errorString;
  }

  formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  formatDateWithTime(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    let hour = '' + d.getHours();
    let minute = '' + d.getMinutes();
    let second = '' + d.getSeconds();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;
    if (second.length < 2) second = '0' + second;
    return (
      [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
    );
  }

  async getPaymentDates(period) {
    // period format: "YYYY-MM"
    const [year, monthStr] = period.split('-');
    const month = parseInt(monthStr, 10);
    let paymentMonth,
      paymentYear = parseInt(year, 10);

    if ([9, 10, 11].includes(month)) {
      // Sep-Nov → Des
      paymentMonth = 12;
    } else if ([12, 1, 2].includes(month)) {
      // Des-Feb → Mar
      paymentMonth = 3;
      if (month === 12) {
        paymentYear = parseInt(year, 10) + 1; // karena kalau Des 2023 → Maret 2024
      } else {
        paymentYear = parseInt(year, 10);
      }
    } else if ([3, 4, 5].includes(month)) {
      // Mar-Mei → Jun
      paymentMonth = 6;
    } else if ([6, 7, 8].includes(month)) {
      // Jun-Agu → Sep
      paymentMonth = 9;
    }

    // Format YYYY-MM
    const nextPaymentDate = `${paymentYear}-${String(paymentMonth).padStart(2, '0')}`;

    // lastPaymentDate = previous payment bulan (mundur 3 bulan)
    const lastPayment = new Date(paymentYear, paymentMonth - 1, 1);
    lastPayment.setMonth(lastPayment.getMonth() - 3);
    const lastPaymentDate = `${lastPayment.getFullYear()}-${String(
      lastPayment.getMonth() + 1,
    ).padStart(2, '0')}`;

    return { lastPaymentDate, nextPaymentDate };
  }
}
