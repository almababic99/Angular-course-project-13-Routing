import { Component, computed, input } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<User>();
  // input.required<User>() means that this component expects an input property (user) of type User. 
  // The required decorator indicates that this input is mandatory, and the component cannot function properly without it.

  imagePath = computed(() => 'users/' + this.user().avatar);
  // computed allows you to define computed properties in a reactive way. 
  // This ensures that whenever the user input changes, the computed property imagePath will automatically update.
  // The computed property imagePath generates a URL to an image file for the user. It concatenates 'users/' with the user's avatar property 
  // (e.g., if the user’s avatar is "avatar123.png", the result would be "users/avatar123.png").
}
