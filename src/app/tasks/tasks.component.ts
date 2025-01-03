import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  // This component is responsible for displaying tasks for a specific user. 
  // It listens to changes in the TasksService and updates the view accordingly.

  userId = input.required<string>(); // userId is required as input from route parameters.
  // userId -> an input property that will be passed to the component from a parent component or route. 
  // It represents the user ID for whom the tasks will be filtered.

  private tasksService = inject(TasksService); // injecting TasksService
  // tasksService -> the service that provides the list of tasks and operations to modify them.

  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId())
  );
  // userTasks -> a computed property that filters the tasks based on the current userId. 
  // It automatically updates whenever the tasksService.allTasks signal changes.
}
