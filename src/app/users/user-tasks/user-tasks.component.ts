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
  // The value of userName will be resolved by the resolveUserName resolver before the component is activated
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

// The resolveUserName function is defined as a route resolver using the ResolveFn type.
// Resolvers in Angular are used to fetch data before a route is activated. This is useful when you need to pre-fetch data
// (e.g., user data) before displaying the component, which ensures the component has all the necessary data when it's rendered.
// The resolveUserName function uses Angular's activatedRoute.paramMap to access the route's userId parameter,
// which was passed in the URL (e.g., /users/123).
// It then uses the UsersService to search for the user in the users array based on the userId.
// The function returns the user's name (or an empty string if not found).
// This resolved value is passed to the component via the resolve property in the route configuration (app.routes.ts)

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
};
// resolveTitle is a resolver: It uses the ResolveFn type, which ensures the resolver runs before the route is activated, 
// allowing you to pre-fetch data that the component needs.
// Invoking resolveUserName: Inside the resolveTitle function, it calls the resolveUserName function, 
// which fetches the name of the user based on the userId parameter in the route.
// After resolveUserName returns the user's name, the resolveTitle function concatenates the name with the string '\'s Tasks'. 
// This results in a title like: "David Miller's Tasks" if the user's name is David Miller
