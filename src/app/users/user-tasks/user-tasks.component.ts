import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>(); // userId is required as input from route parameters.

  // private usersService = inject(UsersService); // Injecting the UsersService to fetch user data.

  // userName = computed(
  //   // Computing the user's name based on the userId.
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  userName = input.required<string>();
  // userName is input property that is required.
  message = input.required<string>();
  // message is input property that is required. It is expected to be passed to the component when it is used, from app.routes.ts

  // ngOnInit() {
  //   // ngOnInit() is a lifecycle hook that is executed when the component is initialized
  //   console.log('Input data: ' + this.message());
  //   // it logs the value of the message (from app.routes.ts) input property to the console
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};
