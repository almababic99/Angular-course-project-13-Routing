// This file provides the configuration for the Angular application, including settings related to routing.

import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    // ApplicationConfig -> Angular type that describes the overall application configuration. 
    // It includes things like providers, which are injected dependencies or services for the app.
    providers: [  
      // providers array contains various Angular services or configurations that the application needs. 
      // Here, it's setting up the router with the routes array.
      provideRouter(routes, withComponentInputBinding()),
      // provideRouter function sets up the router for the application. It takes the routes array (imported from app.routes.ts) 
      // and provides the routing functionality to the application. 
      // By using withComponentInputBinding(), Angular automatically provides the route parameter (userId) as an input to the component 
      // (UserTasksComponent) without needing to manually subscribe to the route or inject the route data.
    ],
}  