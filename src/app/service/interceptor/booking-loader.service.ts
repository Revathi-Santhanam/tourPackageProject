import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingLoaderService {
  isBooking = false;
  constructor() {}

  setBooking(status: boolean) {
    this.isBooking = status;
  }

  getBooking() {
    return this.isBooking;
  }
}
