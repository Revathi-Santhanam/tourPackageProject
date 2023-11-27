import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { DestinationService } from 'src/app/service/destination.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
})
export class DestinationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private router: Router
  ) {}
  error: string = '';
  categoryId: number | undefined;
  tours: Tour[] = [];
  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryId = parseInt(categoryId!);
    console.log(this.categoryId);
    this.getDestinationTour();
  }
  getDestinationTour() {
    this.destinationService.getDestinationTour(this.categoryId!).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.tours = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  navigateToTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
}
