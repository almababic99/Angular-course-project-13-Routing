import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);

  private router = inject(Router);  // Injected router to navigate between views.
  private activatedRoute = inject(ActivatedRoute);  //  Injected to get information about the current route (e.g., URL parameters).

  onComplete() {  // This method is triggered when the user marks the task as complete.
    this.tasksService.removeTask(this.task().id); 
    // It calls the removeTask method of TasksService, passing the task ID to remove that task from the task list.
    
    this.router.navigate(['./'], {
      // After removing the task, the method uses the router.navigate method to navigate back to the current route 
      // ('./' refers to the same path as the current route). This ensures the task list is reloaded, reflecting the task removal.
      relativeTo: this.activatedRoute,  // This makes the navigation relative to the current route.
      onSameUrlNavigation: 'reload', // This ensures that even if the user is on the same URL, the page will reload, 
                                    // which is important to reflect the removal of the task.
      queryParamsHandling: 'preserve', // This ensures that any query parameters (if present) are preserved during navigation.
    });
  }
}
