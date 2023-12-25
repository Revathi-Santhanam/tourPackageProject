import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApiResponse } from 'src/app/model/apiResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
import { EmailService } from 'src/app/service/email.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterService } from 'src/app/service/toaster.service';

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
  name: string = '';
  error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToasterService
  ) {}
  register(registrationForm: any): void {
    console.log(registrationForm.value);
    let register: Register = {
      username: this.username,
      password: this.password,
      name: this.name,
      phoneNumber: parseInt(this.phoneNumber),
    };
    this.auth.register(register).subscribe({
      next: (response: any) => {
        this.register = response.data;
        this.toastr.success('Registered successfully!');
        this.router.navigate(['/login']);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

}
