import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';

// we use this users.routes.ts in app.routes.ts

export const routes: Routes = [
  {
    path: '', // localhost:4200/users/<userId>
    redirectTo: 'tasks', // this means to redirect to localhost:4200/users/<userId>/tasks when the user visits localhost:4200/users/<userId>
    pathMatch: 'full', // pathMatch defines how the path should match the URL. This ensures that the redirect only happens when
    // the user visits /users/:userId directly and not when they visit something like /users/:userId/tasks.

    // When a user visits /users/:userId (e.g., /users/123), you want to automatically show them the tasks page (/users/123/tasks)
    // without requiring the user to manually navigate to that sub-path.
    // This route will automatically redirect to second child below:
  },
  {
    path: 'tasks', // localhost:4200/users/<userId>/tasks
    component: TasksComponent,
    // /users/:userId/tasks will render the TasksComponent.
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    // The runGuardsAndResolvers: 'paramsOrQueryParamsChange' ensures that the resolver is re-run if either the route parameters or query 
    // parameters change. This is useful for keeping the task list updated when the userId or order changes.
    resolve: {
      userTasks: resolveUserTasks,
    },
    // resolveUserTasks function is defined as a resolver function. This resolver will be executed when the route is activated, 
    // and it will fetch the required data (in this case, the tasks for a user). 
    // The resolved data will then be injected into the TasksComponent as an input, and the component can use it immediately.
  },
  {
    path: 'tasks/new', // localhost:4200/users/<userId>/tasks/new
    component: NewTaskComponent,
    // /users/:userId/tasks/new will render the NewTaskComponent.
    canDeactivate: [canLeaveEditPage],
    // whenever the user tries to leave the "New Task" page, Angular will call the canLeaveEditPage guard function 
    // from new-task.component.ts before proceeding with the navigation.
  },
];
