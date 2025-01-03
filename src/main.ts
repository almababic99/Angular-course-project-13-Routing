import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// bootstrapApplication: This function initializes the Angular application in a browser environment.
// AppComponent: This is the root component of the Angular application, typically where the initial HTML template and view are defined.
// appConfig: This configuration object contains settings and providers for the application. It is imported from the app.config.ts file.
// .catch((err) => console.error(err)): If there's an error while bootstrapping the app, it will be caught and logged to the console.
