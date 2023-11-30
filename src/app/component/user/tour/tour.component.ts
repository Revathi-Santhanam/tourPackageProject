import { Component, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Itineraray } from 'src/app/model/itineraray';
import { Tour } from 'src/app/model/tour';
import { UserBooking } from 'src/app/model/user-booking';
import { BookingService } from 'src/app/service/booking.service';
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
    phone: '',
    dateBook: '',
    numberTicket: 1,
  };
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
    balanceSeats: 0,
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
    public bookingLoadingService: BookingLoaderService
  ) {}

  ngOnInit(): void {
    const tourId = this.route.snapshot.paramMap.get('id');
    this.tourId = parseInt(tourId!);
    console.log(tourId);
    this.getTourDetails();
  }
  submitForm(form: NgForm) {
    let userBooking: UserBooking = {
      user_id: this.storage.getLoggedInUser().id,
      tour_id: this.tourId!,
      count: this.userData.numberTicket,
      price: this.userData.numberTicket * this.tour.price,
    };
    console.log(userBooking);
    this.bookingService.postBookingDetails(userBooking).subscribe({
      next: (response: any) => {
        // console.log(response.data);
        userBooking = response;
        this.showLottieAnimation = true;
        this.bookingLoadingService.setBooking(true);
        this.scrollToTop();
        setTimeout(() => {
          this.ngZone.run(() => {
            this.showLottieAnimation = false;
            this.bookingLoadingService.setBooking(false);
            this.router.navigate(['/myaccount']);
          });
        }, 8000);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTourDetails() {
    this.tourService.getTourDetails(this.tourId!).subscribe({
      next: (response: any) => {
        this.tour = response.data;
        console.log(this.tour.itineraryList);
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
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  isItineraryVisible: boolean[] = [];

  toggleItinerary(dayIndex: number): void {
    this.isItineraryVisible[dayIndex] = !this.isItineraryVisible[dayIndex];
  }
}
