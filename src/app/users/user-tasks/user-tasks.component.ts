import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();  // userId is required as input from route parameters.

  private usersService = inject(UsersService);  // Injecting the UsersService to fetch user data.

  userName = computed(  // Computing the user's name based on the userId.
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );

  message = input.required<string>();
  // message is input property that is required. It is expected to be passed to the component when it is used, from app.routes.ts
  
  ngOnInit() {  // ngOnInit() is a lifecycle hook that is executed when the component is initialized
    console.log('Input data: ' + this.message());
    // it logs the value of the message (from app.routes.ts) input property to the console
  }
}
