import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private router:Router,
    private stortage: StorageService,
  ) {} 

  user:String=this.stortage.getLoggedInUser().name!;
  
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
  navTour():void{
    if(this.isLoggedIn){
      this.router.navigate(['/alltour']);
    }else{
      this.router.navigate(['/login']);
    }
  }
  navDes():void{
    if(this.isLoggedIn){
      this.router.navigate(['/alldestination']);
    }else{
      this.router.navigate(['/login']);
    }
  }
  logout(): void {
    this.authService.logout();
  }

}
