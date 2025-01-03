// This file defines the routing configuration for your Angular application.

// Routing in Angular is a way to navigate between different parts of an application. It allows you to map URLs to components, 
// and when the user navigates, Angular loads and displays the corresponding component without refreshing the entire page. 

import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [ 
  // Routes -> Angular type that defines an array of route objects, where each object represents a route in the application.
  // routes is an array of route objects. Each object in this array defines:
    // A path: The URL the user should visit to trigger the associated component.
    // A component: The component that should be displayed when the user navigates to the given path.
  {
    path: '',   // localhost:4200/
    component: NoTaskComponent,
    // When the user navigates to localhost:4200/, the NoTaskComponent will be rendered.
  },
//   {
//     path: 'tasks',   // localhost:4200/tasks
//     component: TasksComponent,
//     // When the user navigates to localhost:4200/tasks, the TasksComponent will be rendered.
//   },
  {
    path: 'users/:userId',  // localhost:4200/users/<userId>
    component: UserTasksComponent
    // This route is dynamic because of the : in the URL path. The :userId part of the path indicates a parameter. 
    // When a user navigates to a URL like localhost:4200/users/123, the part after users/ (in this case, 123) will be captured as the userId.
    // This dynamic route is useful when you need to display content related to a specific user, based on their unique ID.
    // This specifies that when the user navigates to a URL like localhost:4200/users/123, 
    // Angular will render the UserTasksComponent, passing the userId 123 as a parameter.
  }
];
