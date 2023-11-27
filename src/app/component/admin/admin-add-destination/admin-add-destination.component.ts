import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { DestinationService } from 'src/app/service/destination.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'add-destination',
  templateUrl: './admin-add-destination.component.html',
  styleUrls: ['./admin-add-destination.component.css'],
})
export class AdminAddDestinationComponent {
  error: string = '';
  INITIAL_CATEGORY: Category = {
    id: 0,
    categoryName: '',
  };
  categories: Category[] = [];
  categoryModel: Category = this.INITIAL_CATEGORY;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private storage: StorageService
  ) {
    this.categoryModel.categoryName = this.storage.getCategory().categoryName;
  }
 
  
  submitForm(destinationForm: any): void {
    console.log(destinationForm.value);
    this.categoryModel.id = this.storage.getCategory().id;
    
    if (this.categoryModel.id === 0) {
      this.destinationService
        .postCategory({ categoryName: this.categoryModel.categoryName })
        .subscribe({
          next: (response: any) => {
            this.categories = response.data;
            this.categoryModel = this.INITIAL_CATEGORY;
            this.router.navigate(['/admin/destination']);
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
    } else {
      this.categoryModel = this.storage.getCategory();
      this.categoryModel = this.INITIAL_CATEGORY;
      this.destinationService.putCategory(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
          this.storage.removeCategory();
          this.router.navigate(['/admin/destination']);
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
