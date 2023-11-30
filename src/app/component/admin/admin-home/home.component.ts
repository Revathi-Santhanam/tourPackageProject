import { Component } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { Tour } from 'src/app/model/tour';
import { UserDetails } from 'src/app/model/userdetails';
import { BookingService } from 'src/app/service/booking.service';
import { TourService } from 'src/app/service/tour.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent {
  userDetails: UserDetails[] = [];
  totalUsers:number=0;
  error:string='';
  bookings: Booking[] = [];
  totalBookings:number=0;
  revenue:number=0;
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
  tours: Tour[] = [];
  editId:number=0;
  tourCount:number=0;
  tour: Tour = {
    id: 0,
    tourName: '',
    tourPhoto: undefined,
    price: 0,
    destination: '',
    totalSeats: 0,
    balanceSeats: 0,
    days: 0,
    tourDescription: '',
    itineraryList: []
  };
  constructor(private usersService: UsersService,
    private bookingService: BookingService,
    private tourService:TourService) {}
  ngOnInit(): void {
    this.getUserDetails();
    this.getBookingDetails();
    this.getTours();
  } 
  getUserDetails() {
    this.usersService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: UserDetails[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.totalUsers=userDetails.length;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
 


  getBookingDetails() {
    this.bookingService.getBookingDetails().subscribe({
      next: (response: any) => {
        let bookings: Booking[] = response.data;
        if (bookings.length > 0) {
          this.bookings = bookings;
          console.log(this.bookings);
          
          this.totalBookings=this.bookings.length;
          for(var book of bookings){
            this.revenue+=book.price;
          }
          
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  getTours() {
    this.tourService.getTours().subscribe({
      next: (response: any) => {
        let tours: Tour[] = response.data;
        if (tours.length > 0) {
          this.tours = tours;
          this.tourCount=this.tours.length;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
