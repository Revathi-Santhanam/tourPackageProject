import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/admin-home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { HomeComponent } from './component/user/home/home.component';
import { DestinationComponent } from './component/user/destinationTour/destination.component';
import { TourComponent } from './component/user/tour/tour.component';
import { AllTourComponent } from './component/user/all-tour/all-tour.component';
import { NavbarComponent } from './component/user/navbar/navbar.component';
import { FooterComponent } from './component/user/footer/footer.component';
import { AllDestinationComponent } from './component/user/all-destination/all-destination.component';
import { MyAccountComponent } from './component/user/my-account/my-account.component';
import { AdminNavbarComponent } from './component/admin/admin-navbar/admin-navbar.component';
import { AdminDestinationComponent } from './component/admin/admin-destination/admin-destination.component';
import { AdminTourComponent } from './component/admin/admin-tour/admin-tour.component';
import { UsersComponent } from './component/admin/users/users.component';
import { BookingsComponent } from './component/admin/bookings/bookings.component';
import { AdminAddTourComponent } from './component/admin/admin-add-tour/admin-add-tour.component';
import { AdminAddDestinationComponent } from './component/admin/admin-add-destination/admin-add-destination.component';
import { BlogComponent } from './component/user/blog/blog.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    DestinationComponent,
    TourComponent,
    AllTourComponent,
    NavbarComponent,
    FooterComponent,
    AllDestinationComponent,
    MyAccountComponent,
    AdminNavbarComponent,
    AdminDestinationComponent,
    AdminTourComponent,
    UsersComponent,
    BookingsComponent,
    AdminAddTourComponent,
    AdminAddDestinationComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      preventDuplicates: true, 
      closeButton: true, 
      progressBar: true, 
      timeOut: 7000, 
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
