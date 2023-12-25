import { Component, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApiResponse } from 'src/app/model/apiResponse';
import { Itineraray } from 'src/app/model/itineraray';
import { Tour } from 'src/app/model/tour';
import { UserBooking } from 'src/app/model/user-booking';
import { BookingService } from 'src/app/service/booking.service';
import { EmailService } from 'src/app/service/email.service';
import { BookingLoaderService } from 'src/app/service/interceptor/booking-loader.service';
import { StorageService } from 'src/app/service/storage.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent {
  options: AnimationOptions = {
    path: '/assets/loading.json',
  };
  tourId: number | undefined;
  userData = {
    name: '',
    email: '',
    phone: 0,
    dateBook: '',
    numberTicket: 1,
  };
  isItineraryVisible: boolean[] = [];
  itineraries: Itineraray[] = [];
  itinerary: Itineraray = {
    day: 0,
    morning: '',
    breakfast: false,
    afternoon: '',
    lunch: false,
    night: '',
    dinner: false,
    hotel: '',
  };
  error: string = '';
  tour: Tour = {
    id: 0,
    tourName: '',
    tourPhoto: undefined,
    price: 0,
    destination: '',
    totalSeats: 0,
    balanceSeats: 20,
    days: 0,
    tourDescription: '',
    itineraryList: [],
  };
  showLottieAnimation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private storage: StorageService,
    private bookingService: BookingService,
    private router: Router,
    private ngZone: NgZone,
    public bookingLoadingService: BookingLoaderService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    //for parsing tour id 
    const tourId = this.route.snapshot.paramMap.get('id');
    this.tourId = parseInt(tourId!);
    this.getTourDetails();
  }

  //form to submit booking of tour
  submitForm(form: NgForm) {
    let userBooking: UserBooking = {
      user_id: this.storage.getLoggedInUser().id,
      tour_id: this.tourId!,
      count: this.userData.numberTicket,
      price: this.userData.numberTicket * this.tour.price,
      name: this.userData.name,
      userName: this.userData.email,
      phoneNumber: this.userData.phone
    };
    this.bookingService.postBookingDetails(userBooking).subscribe({
      next: (response: any) => {
        userBooking = response;
        this.showLottieAnimation = true;
        this.bookingLoadingService.setBooking(true);
        this.scrollToTop();
        setTimeout(() => {
          this.ngZone.run(() => {
            this.showLottieAnimation = false;
            this.bookingLoadingService.setBooking(false);
            this.mailTrigger(userBooking.userName);
            this.router.navigate(['/myaccount']);
          });
        }, 5000);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  //after booking is done page will scroll up to show congirmed lottie
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  //to get particular tour details with itineraries
  getTourDetails() {
    this.tourService.getTourDetails(this.tourId!).subscribe({
      next: (response: any) => {
        console.log(response.data);
        
        this.tour = response.data;
        if(this.tour.departureDate){
          this.userData.dateBook=this.tour.departureDate.toString();
        }
        for (var i of this.tour.itineraryList) {
          this.itinerary.day = i.day;
          this.itinerary.afternoon = i.afternoon;
          this.itinerary.breakfast = i.breakfast;
          this.itinerary.dinner = i.dinner;
          this.itinerary.hotel = i.hotel;
          this.itinerary.lunch = i.lunch;
          this.itinerary.morning = i.morning;
          this.itinerary.night = i.night;
        }
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
 
 //toggle to show itineraries for each day
  toggleItinerary(dayIndex: number): void {
    this.isItineraryVisible[dayIndex] = !this.isItineraryVisible[dayIndex];
  }
  mailTrigger(email:String){
    //mail trigger
    this.emailService.sendEmail(email).subscribe({
      next: (response: ApiResponse) => {
        // console.log(response);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
