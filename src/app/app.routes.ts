// This file defines the routing configuration for your Angular application.

// Routing in Angular is a way to navigate between different parts of an application. It allows you to map URLs to components, 
// and when the user navigates, Angular loads and displays the corresponding component without refreshing the entire page. 

import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [ 
  // Routes -> Angular type that defines an array of route objects, where each object represents a route in the application.
  {
    path: 'tasks',
    component: TasksComponent,
    // path: The URL path for this route, in this case, it’s 'tasks'. 
    // component: The component associated with this route, here it's TasksComponent. 
    // When the user navigates to /tasks, the TasksComponent will be rendered.
  },
];
