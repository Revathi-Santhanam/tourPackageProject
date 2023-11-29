import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  options: AnimationOptions = {
    path: '/assets/noData.json',
  };
  error: string = '';
  bookings: Booking[] = [];
  totalBookings:number=0;
  bookingDetail: Booking = {
    id: 0,
    username: '',
    name: '',
    tour: '',
    userId: 0,
    phoneNumber: 0,
    bookingStatus: '',
    createdAt: '',
    price: 0,
    days: 0,
    departureDate: ''
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getBookingDetails();
  }
  getBookingDetails() {
    this.bookingService.getBookingDetails().subscribe({
      next: (response: any) => {
        let bookings: Booking[] = response.data;
        if (bookings.length > 0) {
          this.bookings = bookings;
          this.totalBookings=this.bookings.length;
          // this.bookingDetail = bookings[0];
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
