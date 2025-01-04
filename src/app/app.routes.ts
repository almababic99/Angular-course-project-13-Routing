// This file defines the routing configuration for your Angular application.

// Routing in Angular is a way to navigate between different parts of an application. It allows you to map URLs to components,
// and when the user navigates, Angular loads and displays the corresponding component without refreshing the entire page.

import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
// importing the routing configuration for user-related routes from a separate file, specifically the users.routes.ts file.
// The as userRoutes part is an alias. It renames the imported routes array to userRoutes within the current file.
// This is useful if you want to avoid naming conflicts or to provide clarity about the source or purpose of the routes.
// In this case, you're essentially saying, "The routes from users.routes.ts will be known as userRoutes here."
// Because we already have 'routes'

export const routes: Routes = [
  // Routes -> Angular type that defines an array of route objects, where each object represents a route in the application.
  // routes is an array of route objects. Each object in this array defines:
  // A path: The URL the user should visit to trigger the associated component.
  // A component: The component that should be displayed when the user navigates to the given path.
  {
    path: '', // localhost:4200/
    component: NoTaskComponent,
    // When the user navigates to localhost:4200/, the NoTaskComponent will be rendered.
  },
  //   {
  //     path: 'tasks',   // localhost:4200/tasks
  //     component: TasksComponent,
  //     // When the user navigates to localhost:4200/tasks, the TasksComponent will be rendered.
  //   },
  {
    path: 'users/:userId', // localhost:4200/users/<userId>
    component: UserTasksComponent,
    // This route is dynamic because of the : in the URL path. The :userId part of the path indicates a parameter.
    // When a user navigates to a URL like localhost:4200/users/123, the part after users/ (in this case, 123) will be captured as the userId.
    // This dynamic route is useful when you need to display content related to a specific user, based on their unique ID.
    // This specifies that when the user navigates to a URL like localhost:4200/users/123,
    // Angular will render the UserTasksComponent, passing the userId 123 as a parameter.
    children: userRoutes, // Child routes from another file (users.routes.ts)
    // In the routes configuration, the users/:userId route has a children array.
    // This means that within the UserTasksComponent, there will be further nested routes that load different components based on the path.
    // router-outlet tag in user-tasks.component.html will be the place where the child routes (TasksComponent, NewTaskComponent) are rendered.
    data: {
      message: 'Hello!',
    },
    // data is used to pass static data associated with a route. The data object allows you to associate non-dynamic information 
    // with a route that can be accessed by the component that is rendered for that route.
    // This means that when the UserTasksComponent (associated with the route /users/:userId) is loaded, 
    // Angular will attach this message value ('Hello!') to the route's data.
    // We display this message in user-tasks.component.ts
  },
  {
    path: '**',
    component: NotFoundComponent,
    // The path: '**' is a special route in Angular's routing system.
    // It acts as a catch-all route, meaning it will match any URL that does not match any of the other specified paths in your routing configuration.
    // This is typically used for handling "404 Not Found" errors or for rendering a fallback component when the user navigates to a URL that
    // doesn't exist in the application's defined routes.
    // When a user navigates to a route that doesn't match any of the other defined routes, the NotFoundComponent will be rendered.
  },
];
