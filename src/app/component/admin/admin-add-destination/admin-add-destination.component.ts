import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/apiResponse';
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
    categoryPhoto: '',
  };
  editId: number = 0;
  categories: Category[] = [];
  categoryModel: Category = {
    id: 0,
    categoryName: '',
    categoryPhoto: '',
  };
  file = '';
  btnRef = 'Add';
  showToast: boolean = false;
  toastTitle: string = '';
  toastMessage: string = '';

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private storage: StorageService
  ) {
    if (this.storage.getCategory()) {
      console.log('true');
      this.categoryModel.id = this.storage.getCategory().id;
      this.categoryModel.categoryName = this.storage.getCategory().categoryName;
   
    }
   
  }

  submitForm(destinationForm: NgForm): void {
    if (this.categoryModel.id !== 0) {
      this.categoryModel.id = this.storage.getCategory().id;
     
    }
    const formData = new FormData();
    formData.append('categoryPhoto', this.file);
    formData.append('id', this.categoryModel.id?.toString()!);
    formData.append('categoryName', this.categoryModel.categoryName);

    if (this.categoryModel.id === 0) {
      this.destinationService.postCategory(formData).subscribe({
        next: (response: ApiResponse) => {
          this.categoryModel = response.data;
          this.showToast = true;
          this.toastTitle = 'Success';
          this.toastMessage = 'Destination added successfully';
          destinationForm.reset();
          this.router.navigate(['/admin/destination']);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    } else {

      this.destinationService.putCategory(formData).subscribe({
        next: (response: ApiResponse) => {
          // this.categories = response.data;
          // this.categoryModel = this.INITIAL_CATEGORY;
         
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
  
  hideToast(): void {
    this.showToast = false;
  }
}
