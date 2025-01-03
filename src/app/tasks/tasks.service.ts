import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model';

// his service manages the tasks and provides methods for adding, removing, and saving them. 
// It interacts with localStorage to persist the task data across page reloads.

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([   // A reactive signal containing an array of tasks.
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  allTasks = this.tasks.asReadonly();
  // A readonly version of the tasks signal that ensures the tasks cannot be modified directly outside the service.

  constructor() {  
    // On initialization, the service checks if there are any tasks stored in localStorage. If tasks exist, it loads them into the tasks signal.
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  addTask(taskData: NewTaskData, userId: string) {
    // This method allows adding a new task. It creates a task object and adds it to the tasks signal. The task is then saved in localStorage.
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    // This method removes a task from the tasks signal by filtering out the task with the specified id and then saves the updated list in localStorage
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  private saveTasks() {
    // This private method saves the current list of tasks into localStorage by converting the tasks signal into a JSON string.
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
