import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

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

  submitted = false;
  // When the component is first loaded, the submitted flag is set to false. This indicates that the user has not yet submitted the form.

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

    this.submitted = true;
    // By setting submitted = true, the component now knows that the user has completed the form submission. 
    // This will be important for the CanDeactivate route guard to decide whether to show the confirmation dialog when the user 
    // tries to navigate away from the page.

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

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted) {  // This condition checks whether the form has already been submitted (component.submitted is true).
    return true;
  } // If the form has been submitted, there's no need to warn the user about unsaved data, so the guard returns true, 
    // allowing the navigation to proceed without any prompts.
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    // If the user has entered any data in the form fields (enteredTitle, enteredSummary, or enteredDate), 
    // the guard shows a confirmation dialog using window.confirm().
    // The message displayed asks if the user is sure they want to leave without saving data. If the user clicks OK the navigation proceeds. 
    // If they click Cancel, the navigation is blocked, and the user stays on the page.
    return window.confirm('Do you really want to leave? You will lose the entered data.')
  }
  return true;
  // If there is no entered data (i.e., all the form fields are empty), the guard simply returns true, 
  // allowing the navigation to proceed without any confirmation dialog.
}