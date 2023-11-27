import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { DestinationService } from 'src/app/service/destination.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-admin-destination',
  templateUrl: './admin-destination.component.html',
  styleUrls: ['./admin-destination.component.css'],
})
export class AdminDestinationComponent implements OnInit {
  error: string = '';

  destinations: Category[] = [];
  destination:Category={
    categoryName: ''
  }
  editId:number=0;
  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private storage:StorageService
  ) {}
  
  ngOnInit(): void {
    this.getDestinations();
  }
  addNav() {
    this.router.navigate(['/addDestination']);
  }

  getDestinations() {
    this.destinationService.getDestinations().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.destinations = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  deleteDestination(id: number) {
    console.log(id);
    if (id !== undefined) {
      this.destinationService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.destinations = response.data;
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
  editDestination(category:Category) {
    this.storage.setCategory(category)
  //  const checkId = this.destinations.find((num) => num.id === category.id);
  //   if (checkId) {
  //     this.destination.categoryName = checkId.categoryName;
  //   }
    this.router.navigate(['/addDestination']);
  }
}