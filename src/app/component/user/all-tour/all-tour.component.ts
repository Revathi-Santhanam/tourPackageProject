import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-all-tour',
  templateUrl: './all-tour.component.html',
  styleUrls: ['./all-tour.component.css']
})
export class AllTourComponent {
  error: string = '';
  tours: Tour[] = [];
  constructor(private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router) {}
  ngOnInit(): void {
    this.getAllToursForUsers();
  }

  getAllToursForUsers() {
    this.tourService.getAllToursForUsers().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.tours = response.data;
        },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
}
navigateToTour(id: number) {
  this.router.navigate(['/tour', id]);
}
}
