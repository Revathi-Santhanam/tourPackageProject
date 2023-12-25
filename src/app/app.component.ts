import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from './service/auth.service';
import { LoaderService } from './service/loader.service';
import { BookingLoaderService } from './service/interceptor/booking-loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  optionsBooking: AnimationOptions = {
    path: '/assets/booking.json',
    rendererSettings: {
      className: 'lottie-booking',
    },
  };

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    public bookingService: BookingLoaderService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
