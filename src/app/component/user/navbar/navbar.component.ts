import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private router:Router
  ) {} 
  
  isActive(route: string): boolean {
    return this.router.url === route;
  }
 
  
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  logout(): void {
    this.authService.logout();
  }

}
