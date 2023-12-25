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
  editId:number=0;
  desCount:number=0;
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
        // console.log(response.data);
        this.destinations = response.data;
        this.desCount=this.destinations.length;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  deleteDestination(id: number) {
    // console.log(id);
   
      this.destinationService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.destinations = response.data;
        },
        complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
      });
    
  }
  editDestination(category:Category) {
    this.storage.setCategory(category)
    
    this.router.navigate(['/addDestination']);
  }
}
