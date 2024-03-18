// external modules
import { formatDate } from '@angular/common';
import { NativeDateAdapter } from "@angular/material/core";

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, d): string {
    if (Object.keys(d).length === 2) {
      return this.formatarData(date, 'MMM\'.\' \'de\' y');
    } else {
      return this.formatarData(date, 'dd/MM/yyyy');
    }
  }

  parse(value: any): Date | null {
    if (this.isDateFormatDDMMYYYY(value)) {
      const date = value.split('/');
      const parsed = new Date();
      parsed.setFullYear(date[2], date[1] - 1, date[0]);
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    } else {
      return value;
    }
  }

  isDateFormatDDMMYYYY(value: any) {
    return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
      value
    );
  }

  isValid(date: Date) {
    if (Boolean(date.getTime)) {
      return !isNaN(date.getTime());
    } else {
      return false;
    }
  }

  formatarData(data: string | number | Date, formato: string) {
    return formatDate(data, formato, 'pt-BR');
  };
}
