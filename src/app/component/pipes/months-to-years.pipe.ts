import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthsToYears'
})
export class MonthsToYearsPipe implements PipeTransform {

  transform(totalMonths: number): string {
    if (totalMonths == null || totalMonths < 0) return '';

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

    // Add space only if both year and month exist
    return `${yearStr}${yearStr && monthStr ? ' ' : ''}${monthStr}` || '0 months';
  }

}
