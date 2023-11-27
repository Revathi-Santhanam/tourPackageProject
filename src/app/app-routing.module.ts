import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminHomeComponent } from './component/admin/admin-home/home.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './component/user/home/home.component';
import { DestinationComponent } from './component/user/destinationTour/destination.component';
import { AllDestinationComponent } from './component/user/all-destination/all-destination.component';
import { TourComponent } from './component/user/tour/tour.component';
import { AllTourComponent } from './component/user/all-tour/all-tour.component';
import { MyAccountComponent } from './component/user/my-account/my-account.component';
import { AdminDestinationComponent } from './component/admin/admin-destination/admin-destination.component';
import { AdminTourComponent } from './component/admin/admin-tour/admin-tour.component';
import { UsersComponent } from './component/admin/users/users.component';
import { BookingsComponent } from './component/admin/bookings/bookings.component';
import { AdminAddTourComponent } from './component/admin/admin-add-tour/admin-add-tour.component';
import { AdminAddDestinationComponent } from './component/admin/admin-add-destination/admin-add-destination.component';
import { BlogComponent } from './component/user/blog/blog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'destination/:id', component: DestinationComponent },
  { path: 'alldestination', component: AllDestinationComponent },
  { path: 'tour', component: TourComponent },
  { path: 'tour/:id', component: TourComponent },
  { path: 'alltour', component: AllTourComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'admin/destination', component: AdminDestinationComponent },
  { path: 'addDestination', component: AdminAddDestinationComponent, },
  { path: 'admin/tour', component: AdminTourComponent  },
  { path: 'addtour', component: AdminAddTourComponent  },
  { path: 'admin/booking', component: BookingsComponent  },
  { path: 'admin/users', component: UsersComponent, },
  { path: 'blog', component: BlogComponent  },
 
];
//{ path: '', component: HomeComponent, canActivate: [authGuard] }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
