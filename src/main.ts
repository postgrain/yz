import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { appModule } from './yz-view';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(appModule)
  .catch(err => console.error(err));
