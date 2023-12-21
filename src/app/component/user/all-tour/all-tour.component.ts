import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-all-tour',
  templateUrl: './all-tour.component.html',
  styleUrls: ['./all-tour.component.css'],
})
export class AllTourComponent {
  error: string = '';
  tours: Tour[] = [];
  paginatedTours: Tour[] = [];
  itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllToursForUsers();
  }

  getAllToursForUsers() {
    this.tourService.getAllToursForUsers().subscribe({
      next: (response: any) => {
        this.tours = response.data;
        this.totalPages = Math.ceil(this.tours.length / this.itemsPerPage);
        // console.log('Total Pages:', this.totalPages);
        this.updatePaginatedTours();
        // console.log('Paginated Tours:', this.paginatedTours);
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

  updatePaginatedTours() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTours = this.tours.slice(startIndex, endIndex);
    console.log('Paginated Tours:', this.paginatedTours);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTours();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTours();
    }
  }
}
