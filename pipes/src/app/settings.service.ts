import { Injectable } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt, 'pt');

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getLocale() {
    return 'pt';
  }
}
