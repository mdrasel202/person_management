import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { Personcomponent } from './app/personcomponent/personcomponent';
// import { appConfig } from './app/app.config';

// bootstrapApplication(Personcomponent, {
//   providers: [...appConfig.providers]
// });
