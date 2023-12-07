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

  constructor(private tourService: TourService,
    private storage:StorageService,
    private router:Router) {}

  ngOnInit(): void {
    this.getTours();
  
    
  }
  addNav() {
    this.router.navigate(['/addtour']);
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
 
  deleteTour(id: number) {
    // console.log(id);
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
