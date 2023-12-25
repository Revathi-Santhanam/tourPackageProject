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
  { path: 'destination', component: DestinationComponent,canActivate: [authGuard] },
  { path: 'destination/:id', component: DestinationComponent,canActivate: [authGuard] },
  { path: 'alldestination', component: AllDestinationComponent ,canActivate: [authGuard]},
  { path: 'tour', component: TourComponent ,canActivate: [authGuard]},
  { path: 'tour/:id', component: TourComponent ,canActivate: [authGuard]},
  { path: 'alltour', component: AllTourComponent,canActivate: [authGuard] },
  { path: 'myaccount', component: MyAccountComponent,canActivate: [authGuard] },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'admin/destination', component: AdminDestinationComponent,canActivate: [authGuard] },
  { path: 'addDestination', component: AdminAddDestinationComponent, },
  { path: 'admin/tour', component: AdminTourComponent,canActivate: [authGuard]  },
  { path: 'addtour', component: AdminAddTourComponent ,canActivate: [authGuard] },
  { path: 'admin/booking', component: BookingsComponent,canActivate: [authGuard]  },
  { path: 'admin/users', component: UsersComponent,canActivate: [authGuard] },
  { path: 'blog', component: BlogComponent,canActivate: [authGuard]  },
 
];
//{ path: '', component: HomeComponent, canActivate: [authGuard] }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
