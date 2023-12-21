import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Category } from 'src/app/model/category';
import { Tour } from 'src/app/model/tour';
import { AuthService } from 'src/app/service/auth.service';
import { DestinationService } from 'src/app/service/destination.service';
import { LoaderService } from 'src/app/service/loader.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public loaderService: LoaderService,
    private authService: AuthService,
    private destinationService: DestinationService,
    private router: Router,
    private tourService: TourService
  ) {}

  scrollToTop(): void {
    return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  selectedCategoryId: number = 0;
  error: string = '';

  categories: Category[] = [];
  categoryId: number = 0;
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  tourId: number | null = 0;
  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.getDestinationsForUser();
    this.getAllToursForUsers();
  }

  getAllToursForUsers() {
    this.tourService.getAllToursForUsers().subscribe({
      next: (response: any) => {
        this.tours = response.data;
        this.filteredTours = this.tours;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onCategoryChange() {
    // console.log(this.selectedCategoryId);
    this.categoryId = this.selectedCategoryId!;
    this.filterTour();
  }
  filterTour() {
    this.filteredTours = this.tours.filter(
      (tour) => tour.categoryId === +this.categoryId
    );
  }

  getDestinationsForUser() {
    this.destinationService.getDestinationsForUser().subscribe({
      next: (response: any) => {
        this.categories = response.data.categories;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  navigateToDesTours(id: number) {
    if (this.isLoggedIn) {
      this.router.navigate(['/destination', id]);
    } else {
      this.router.navigate(['/login']);
    }
  }
  navigateToSearchTour(id: number) {
    this.router.navigate(['/tour', id]);
  }
  searchTours() {
    if (this.tourId !== null && this.isLoggedIn) {
      this.router.navigate(['/tour', this.tourId]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
