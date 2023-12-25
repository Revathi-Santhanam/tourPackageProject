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
import { Category } from 'src/app/model/category';
import { Itineraray } from 'src/app/model/itineraray';
import { Tour } from 'src/app/model/tour';
import { DestinationService } from 'src/app/service/destination.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterService } from 'src/app/service/toaster.service';
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
  selectedCategoryId: number = 0;
  selectedCategoryname: String = '';
  tourFormModel: Tour = {
    id: 0,
    itineraryList: [],
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

  destinations: Category[] = [];
  minDate: string;
  constructor(
    private tourService: TourService,
    private router: Router,
    private destinationService: DestinationService,
    private toastr: ToasterService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.getDestinations();
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
  onCategoryChange() {
    this.tourFormModel.categoryId = this.selectedCategoryId!;
  }

  getDestinations() {
    this.destinationService.getDestinations().subscribe({
      next: (response: any) => {
        // console.log(response.data);
        this.destinations = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  submitForm(tourForm: NgForm): void {
    const formData = new FormData();
    formData.append('tourPhoto', this.file);
    formData.append('id', this.tourFormModel.id.toString());
    formData.append('tourName', this.tourFormModel.tourName);
    formData.append('itineraries', JSON.stringify(this.itineraries));
    formData.append('categoryId', this.tourFormModel.categoryId?.toString()!);
    formData.append('price', this.tourFormModel.price.toString());
    formData.append('totalSeats', this.tourFormModel.totalSeats.toString());
    formData.append('tourDescription', this.tourFormModel.tourDescription);
    formData.append(
      'departureDate',
      this.tourFormModel.departureDate?.toString()!
    );
    formData.append('days', this.tourFormModel.days.toString());

    this.tourService.postTour(formData).subscribe({
      next: (response: ApiResponse) => {
        // console.log(response.data);
        this.toastr.success('Destination editted successfully!');
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
