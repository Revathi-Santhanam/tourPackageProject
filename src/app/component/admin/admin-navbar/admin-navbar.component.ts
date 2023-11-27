import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  constructor(
    private authService: AuthService,
    public loaderService: LoaderService
  ) {}  
  logout(): void {
    this.authService.logout();
  }

}
