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
    this.getDestinationTour();
  }
  getDestinationTour() {
    this.destinationService.getDestinationTour(this.categoryId!).subscribe({
      next: (response: any) => {
        // this.tours = response.data
        const today = new Date();
        this.tours = response.data.filter((tour: Tour) => new Date(tour.departureDate!) > today);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  navigateToTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
}
