import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

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
  },
  {
    path: 'tasks/new', // localhost:4200/users/<userId>/tasks/new
    component: NewTaskComponent,
    // /users/:userId/tasks/new will render the NewTaskComponent.
  },
];
