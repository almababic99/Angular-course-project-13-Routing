import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();  
  // This is an input property, required from the route parameters. It identifies the user to whom the task will be assigned.

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  // These are reactive signals that hold the values entered in the form. 
  // The signals are used for form inputs, meaning their values will automatically update whenever the user types something in the fields.

  private tasksService = inject(TasksService);
  // This is the injected service that is responsible for adding tasks to the task list.

  private router = inject(Router);
  //  This is injected to allow navigation after the form submission.

  onSubmit() {  // This method is triggered when the user submits the form.
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    // It calls the addTask method of the TasksService to add a new task, passing in the task details (title, summary, and due date) 
    // as well as the userId.

    // After the task is added, it navigates to the user's task list page using this.router.navigate(). 
    // This redirect ensures that the user is taken to the updated list of tasks for the current user:
    // if this.userId() is 'u3', the resulting URL would be /users/u3/tasks. 
    // This means the user will be navigated to the task list page for user 'u3'.
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
      // By setting replaceUrl: true, you are replacing the current URL with the new one in the browser’s history. 
      // This can be useful to prevent users from going "back" to the form page after submitting the task, as the "back" 
      // button will now take them to the previous page before the task creation.
    });
  }
}
