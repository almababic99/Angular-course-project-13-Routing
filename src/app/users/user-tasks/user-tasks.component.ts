import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();  // userId is required as input from route parameters.

  private usersService = inject(UsersService);  // Injecting the UsersService to fetch user data.

  userName = computed(  // Computing the user's name based on the userId.
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );
}
