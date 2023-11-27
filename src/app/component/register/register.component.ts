import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  name:string='';
  error: string='';

  constructor(private auth:AuthService,private router:Router){}
  register(registrationForm: any): void {
    console.log(registrationForm.value);
    let register:Register={
      username: this.username,
      password: this.password,
      name: this.name,
      phoneNumber: parseInt(this.phoneNumber)
    }
    this.auth.register(register)
    .subscribe({
      next: (response: any) => {
        this.register = response.data;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",")
          ? message.split(",")[0]
          : message;
      },
    });
  }
}
