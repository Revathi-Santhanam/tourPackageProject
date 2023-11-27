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
  userDetail: UserDetails = {
    id: 0,
    username: '',
    name: '',
    role: '',
    createdAt: '',
    phoneNumber: 0,
  };

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
          // this.userDetail = userDetails[0];
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  // setSelectedUser(userDetail: UserDetails): void {
  //   this.userDetail = userDetail;
  // }
}
