import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Itineraray } from 'src/app/model/itineraray';
import { Tour } from 'src/app/model/tour';
import { StorageService } from 'src/app/service/storage.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-admin-add-tour',
  templateUrl: './admin-add-tour.component.html',
  styleUrls: ['./admin-add-tour.component.css'],
})
export class AdminAddTourComponent {
  constructor(
    private tourService: TourService,
    private router: Router,
    private storage: StorageService
  ) {
    this.tourFormModel = this.storage.getTour();
  }
  error: string = '';
  itenaryday: number = 0;
  itineraries: Itineraray[] = [];
  tourFormModel: Tour = {
    id: 0,
    itineraries: [],
    tourName: '',
    price: 0,
    category: '',
    totalSeats: 0,
    days: 0,
    tourDescription: '',
  };

  tourId: number | undefined;
  tourName: string = '';
  destinationName: string = '';
  tourDescription: string = '';
  tourDays: number | undefined;
  departureDate: Date | undefined;
  tourPrice: number | undefined;
  totalSeats: number | undefined;
  itineraryId: number | undefined;
  day: number | undefined;
  hotel: string = '';
  morning: string = '';
  afternoon: string = '';
  night: string = '';
  breakFast: string = '';
  lunch: string = '';
  dinner: string = '';
  categoryId: number | undefined;
  getItineraries() {
    this.itenaryday = this.tourDays!;
    console.log(this.itenaryday);

    for (let i = 0; i < this.itenaryday!; i++) {
      this.itineraries.push({
        day: 0,
        morning: '',
        breakfast: false,
        afternoon: '',
        lunch: false,
        night: '',
        dinner: false,
        hotel: '',
      });
    }
  }

  submitForm(tourForm: any): void {
    this.tourFormModel = {
      tourName: this.tourName,
      categoryId: this.categoryId!,
      price: this.tourPrice!,
      category: this.destinationName,
      totalSeats: this.totalSeats!,
      days: this.tourDays!,
      tourDescription: this.tourDescription,
      tourPhoto: null,
      itineraries: this.itineraries,
      departureDate: this.departureDate,
    };
    this.tourFormModel.id = this.storage.getTour().id;
    if (this.tourFormModel.id === 0) {
      this.tourService.postTour(this.tourFormModel).subscribe({
        next: (response: any) => {
          // console.log(response.data);
          this.tourFormModel = response;
          this.router.navigate(['/admin/tour']);
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {
      this.tourFormModel = this.storage.getTour();
      this.tourService.putTour(this.tourFormModel).subscribe({
        next: (response: any) => {
          this.tourFormModel = response.data;
          this.storage.removeTour();
          this.router.navigate(['/admin/tour']);
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }
}
