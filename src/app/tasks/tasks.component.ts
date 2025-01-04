import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',  // Defines the custom HTML tag <app-tasks> used to embed this component in other templates.
  standalone: true,  // This tells Angular that this component does not depend on a parent module (it can work independently).
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // This component is responsible for displaying tasks for a specific user.
  // It listens to changes in the TasksService and updates the view accordingly.

  userTasks = input.required<Task[]>();
  // This input is required and will receive the resolved tasks (Task[]) from the resolveUserTasks function. 
  // The tasks will be injected automatically into the component by the Angular router when navigating to the route.
  
  order = input<'asc' | 'desc' | undefined>();
  // This input is used to pass the sort order for tasks. 
  // It can be either 'asc' or 'desc', and it's determined via the query parameter order from the route.

  userId = input.required<string>(); // userId is required as input from route parameters.
  // userId -> an input property that will be passed to the component from a parent component or route.
  // It represents the user ID for whom the tasks will be filtered.

  // private tasksService = inject(TasksService); // injecting TasksService
  // tasksService -> the service that provides the list of tasks and operations to modify them.

  // order = input<'asc' | 'desc'>();
  // order = signal<'asc' | 'desc'>('desc');
  // This signal stores the current sort order for tasks ('asc' for ascending or 'desc' for descending).
  // By default, it's set to 'desc'.

  // private activatedRoute = inject(ActivatedRoute);
  // The ActivatedRoute is an Angular service that provides access to the information about the current route including:
  // Route parameters (like id, userId, etc. that might be part of the URL).
  // Query parameters (like order in this case, which might be passed as part of the URL query string).
  // Route data (static or dynamic data associated with the route).
  // The current router state (such as the fragment or URL).
  // In TasksComponent, we are interested in query parameters from the URL, specifically the order parameter, 
  // which indicates whether the tasks should be sorted in ascending (asc) or descending (desc) order.
  // So, ActivatedRoute helps this component to read the dynamic parameters from the URL (like sorting order) 
  // and use them to adjust how tasks are displayed.

  // private destroyRef = inject(DestroyRef);

  // userTasks = computed(() =>
  //   this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'desc') {
  //         return a.id > b.id ? -1 : 1
  //       }
  //       else {
  //         return a.id > b.id ? 1 : -1
  //       }
  //     })
  // );
  // userTasks -> a computed property that filters the tasks based on the current userId.
  // It automatically updates whenever the tasksService.allTasks signal changes.
  // It filters tasks by userId and sorts them based on the order signal.
    // If the order is 'desc', tasks are sorted in descending order of their id.
    // If the order is 'asc', tasks are sorted in ascending order of their id.

  // ngOnInit() {  // ngOnInit() is the lifecycle hook called when the component is initialized
  //   const subscription = this.activatedRoute.queryParams.subscribe({
  //     // The queryParams object contains key-value pairs of the query parameters (e.g., { order: 'asc' }).
  //     // You subscribe to this observable to listen for any changes in the query parameters 
  //     // (e.g., when the URL changes due to user interaction with the sorting link).
  //     next: (params) => this.order.set(params['order']),
  //     // callback function (next: (params) => this.order.set(params['order'])) updates the order signal based on the order query parameter.
  //   });
  //   // It subscribes to route query parameters via activatedRoute.queryParams. 
  //   // The query parameter order is used to update the order signal.

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  //   // When the component is destroyed, the subscription is cleaned up
  // }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};
// Resolvers are used to fetch data before the route is activated. 
// In this case, resolveUserTasks fetches the tasks for a specific user before the TasksComponent is displayed.
// The resolver retrieves the userId from the route parameters (via activatedRouteSnapshot.paramMap).
// It filters the tasks fetched from the TasksService to only include tasks that belong to that specific user (task.userId === userId).
// The order query parameter is used to determine the sorting order:
// If order='asc', tasks are sorted by ascending id.
// Otherwise, tasks are sorted in descending order (id > b.id ? -1 : 1).
// The resolver returns the filtered and sorted tasks, which are injected into the component once it's activated.
