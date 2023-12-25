import { Component } from '@angular/core';
import { UserDetails } from 'src/app/model/userdetails';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  error: string = '';
  userDetails: UserDetails[] = [];

  totalUsers: number = 0;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.usersService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: UserDetails[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.totalUsers = this.userDetails.length;
        }
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
