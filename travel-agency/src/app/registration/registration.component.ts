import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = { username: '', email: '', password: '' , role: 'user'};

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user);
  }
}
