import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Booking } from 'src/app/model/booking';
import { UserDetails } from 'src/app/model/userdetails';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/profile.json',
  };
  constructor(
    private storage: StorageService,
    private bookingService: BookingService
  ) {}
  id: number = this.storage.getLoggedInUser().id;
  bookings: Booking[] = [];
  error: string = '';
  userDetail:AppUser={
    id: 0,
    username: '',
    name: '',
    role: '',
    phoneNumber: 0,
    password: ''
  }

  ngOnInit(): void {
    console.log();
    this.userDetail=this.storage.getLoggedInUser()
    this.getUserBookingDetails();
  }
  getUserBookingDetails() {
    this.bookingService.getBookingUserDetails(this.id).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.bookings = response.data;
        console.log(this.bookings);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
