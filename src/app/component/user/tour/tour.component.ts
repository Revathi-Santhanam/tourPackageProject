import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { UserBooking } from 'src/app/model/user-booking';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  tourId: number | undefined;
  userData = {
    name: '',
    email: '',
    phone: '',
    dateBook: '',
    numberTicket: 1
  };

  error: string='';
  tour:Tour={
    id: 0,
    tourName: '',
    tourPhoto: undefined,
    price: 0,
    category: '',
    totalSeats: 0,
    balanceSeats: 0,
    days: 0,
    tourDescription: '',itineraries:[]
  }
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private storage:StorageService,
    private bookingService:BookingService,
    private router:Router
  ) {
  }
  
  ngOnInit(): void {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.tourId = parseInt(tourId!);
    console.log(tourId);
    this.getTourDetails();
    
    
  }
  submitForm(form: NgForm) {
    let userBooking:UserBooking={
      user_id: this.storage.getLoggedInUser().id,
      tour_id: this.tourId!,
      count: this.userData.numberTicket ,
      price: this.userData.numberTicket*this.tour.price
    }
    console.log(userBooking);
    this.bookingService.postBookingDetails(userBooking).subscribe({
      next: (response: any) => {
        // console.log(response.data);
        userBooking = response;
        this.router.navigate(['/myaccount']);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    
  }
  
 

  getTourDetails() {
    this.tourService.getTourDetails(this.tourId!).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.tour = response.data;
        console.log(this.tour.itineraries);
        
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
