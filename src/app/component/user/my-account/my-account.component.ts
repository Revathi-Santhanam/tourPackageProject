import { Component, OnInit } from '@angular/core';
 
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Booking } from 'src/app/model/booking';
import { UserDetails } from 'src/app/model/userdetails';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/profile.json',
  };
  optionsInvoice: AnimationOptions = {
    path: '/assets/ticket.json',
  };
  constructor(
    private storage: StorageService,
    private bookingService: BookingService
  ) {}
  id: number = this.storage.getLoggedInUser().id;
  bookings: Booking[] = [];
  error: string = '';
  userDetail:AppUser={
    id: 0,
    username: '',
    name: '',
    role: '',
    phoneNumber: 0,
    password: ''
  }
  bookingStatus:string=''
  tourName:string=''
  price:number=0;
  invoiceNumber:string='';
  currentDate=new Date();
  date:string='';
  
  isPopupVisible: boolean = false;

  togglePopup(booking:Booking) {
    this.invoiceNumber=this.bookingService.generateRandomInvoiceNumber();
    this.tourName=booking.tour;
    this.date=booking.departureDate;
    this.bookingStatus=booking.bookingStatus;
    this.price=booking.price;
    this.isPopupVisible = !this.isPopupVisible;
  }
  togglePopupClose(){
    this.isPopupVisible = !this.isPopupVisible;
  }

  ngOnInit(): void {
    console.log();
    this.userDetail=this.storage.getLoggedInUser()
    this.getUserBookingDetails();
  }
  downloadInvoice(): void {
    const invoiceData = this.generateInvoiceData();
    const blob = new Blob([invoiceData], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'ticket_invoice.pdf';
    link.click();
  }
  private generateInvoiceData(): string {
    
   
    return `
    Ticket Invoice
    Invoice Number: ${this.invoiceNumber}
    Date: ${this.currentDate}
    
    Customer Information
    Name: ${this.userDetail.name}
    Email: ${this.userDetail.username}
    
    Tour Information
    Tour Name: ${this.tourName}
    Tour Date: ${this.date}
    Price: ${this.price}
    Booking Status: ${this.bookingStatus}`;
  }
  getUserBookingDetails() {
    this.bookingService.getBookingUserDetails(this.id).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.bookings = response.data;
        console.log(this.bookings);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  // downloadInvoice(): void {
  //   pdfMake.vfs = pdfFonts.pdfMake.vfs;

  //   const docDefinition = {
  //     content: [
  //       'Ticket Invoice',
  //       { text: `Invoice Number: ${this.invoiceNumber}`, bold: true },
  //       { text: `Date: ${this.currentDate }`, bold: true },
  //       'Customer Information',
  //       `Name: ${this.userDetail.name}`,
  //       `Email: ${this.userDetail.username}`,
  //       'Tour Information',
  //       `Tour Name: ${this.tourName}`,
  //       `Tour Date: ${this.date}`,
  //       `Price: ${this.price}`,
  //       `Booking Status: ${this.bookingStatus}`,
  //       'Terms and Conditions',
  //       {
  //         ul: [
  //           'Order can be returned within a maximum of 10 days.',
  //           'Warranty of the product will be subject to the manufacturer terms and conditions.',
  //           'This is a system-generated invoice.'
  //         ]
  //       }
  //     ]
  //   };

  //   pdfMake.createPdf(docDefinition).download('ticket_invoice.pdf');
  // }
}
