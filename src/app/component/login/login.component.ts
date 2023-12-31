import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { ApiResponse } from 'src/app/model/apiResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';

  constructor(private authService: AuthService,
    private router:Router) {}
 
  login(_loginForm: Form): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };
    this.authService.login(login).subscribe({
      next: (response: ApiResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
      },
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
      complete: () => console.log('There are no more action happen.'),
    });
  }
}
