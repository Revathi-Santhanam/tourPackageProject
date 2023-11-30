import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { DestinationService } from 'src/app/service/destination.service';

@Component({
  selector: 'app-all-destination',
  templateUrl: './all-destination.component.html',
  styleUrls: ['./all-destination.component.css']
})
export class AllDestinationComponent {
  error: string = '';
  categories: Category[] = [];
  constructor(private destinationService: DestinationService,
    private router:Router) {}
  ngOnInit(): void {
    this.getDestinationsForUser();
  }

  getDestinationsForUser() {
    this.destinationService.getDestinationsForUser().subscribe({
      next: (response: any) => {
        this.categories = response.data.categories;
        },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  navigateToDesTours(id:number){
    this.router.navigate(['/destination',id])
  }
}
