import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { StorageService } from 'src/app/service/storage.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-admin-tour',
  templateUrl: './admin-tour.component.html',
  styleUrls: ['./admin-tour.component.css'],
})
export class AdminTourComponent {
  error: string = '';
  tours: Tour[] = [];
  editId:number=0;
  tour: Tour = {
    id: 0,
    tourName: '',
    tourPhoto: undefined,
    price: 0,
    category: '',
    totalSeats: 0,
    balanceSeats: 0,
    days: 0,
    tourDescription: '',
    itineraries: []
  };

  constructor(private tourService: TourService,
    private storage:StorageService,
    private router:Router) {}

  ngOnInit(): void {
    this.getTours();
  }
  getTours() {
    this.tourService.getTours().subscribe({
      next: (response: any) => {
        let tours: Tour[] = response.data;
        if (tours.length > 0) {
          this.tours = tours;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  editTour(tour:Tour){
    this.storage.setTour(tour);
    console.log(tour.itineraries);
    this.router.navigate(['/addtour']);
    }
  deleteTour(id: number) {
    console.log(id);
    if (id !== undefined) {
      this.tourService.deleteTour(id).subscribe({
        next: (response: any) => {
          this.tours = response.data;
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
