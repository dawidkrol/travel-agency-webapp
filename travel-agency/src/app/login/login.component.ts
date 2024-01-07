import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { username: '', email: '', password: '', role: 'user' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user.email.trim(), this.user.password.trim());
  }
}
