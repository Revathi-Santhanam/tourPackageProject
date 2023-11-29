import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/apiResponse';
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
  itineraryId: number = 0;
  day: number = 0;
  hotel: string = '';
  morning: string = '';
  afternoon: string = '';
  night: string = '';
  breakFast: boolean = false;
  lunch: boolean = false;
  dinner: boolean = false;
  error: string = '';
  file = '';
  itenaryday: number = 0;
  itineraries: Itineraray[] = [];
  tourFormModel: Tour = {
    id: 0,
    itineraries: [],
    tourName: '',
    price: 0,
    destination: '',
    totalSeats: 0,
    days: 0,
    tourDescription: '',
    balanceSeats: 0,
    tourPhoto: null,
    departureDate: undefined,
    categoryId: 0,
  };
  constructor(
    private tourService: TourService,
    private router: Router,
    private storage: StorageService
  ) {
    
  }

  getItineraries() {
    this.itenaryday = this.tourFormModel.days!;

    for (let i = 0; i < this.itenaryday!; i++) {
      this.itineraries.push({
        id: this.itineraryId,
        day: this.day,
        morning: this.morning,
        breakfast: this.breakFast,
        afternoon: this.afternoon,
        lunch: this.lunch,
        night: this.night,
        dinner: this.dinner,
        hotel: this.hotel,
      });
    }
  }

  submitForm(tourForm: NgForm): void {
    console.log(this.tourFormModel.itineraries);
    
    const formData = new FormData();
    formData.append('tourPhoto', this.file);
    formData.append('id', this.tourFormModel.id.toString());
    formData.append('tourName', this.tourFormModel.tourName);
    formData.append('destination', this.tourFormModel.destination);
    formData.append('itineraries',JSON.stringify(this.tourFormModel.itineraries))
    formData.append('categoryId', this.tourFormModel.categoryId?.toString()!);
    formData.append('price',this.tourFormModel.price.toString())
    formData.append('totalSeats',this.tourFormModel.totalSeats.toString())
    formData.append('tourDescription', this.tourFormModel.tourDescription);
    formData.append('departureDate',this.tourFormModel.departureDate?.toString()!)
    formData.append('days',this.tourFormModel.days.toString())

  
      this.tourService.postTour(formData).subscribe({
        next: (response: ApiResponse) => {
          console.log(response.data);

          tourForm.reset();
          this.router.navigate(['/admin/tour']);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    
  }
  onFileChange(event: any) {
    const fileInput = event.target.files[0];
    this.file = fileInput;
  }
}
