import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/apiResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { UserBooking } from '../model/user-booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  getBookingDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/admin/history/all`);
  }
  getBookingUserDetails(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/history/${id}`);
  }
  postBookingDetails(booking:UserBooking): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${urlEndpoint.baseUrl}/history`,booking);
  }
  generateRandomInvoiceNumber(): string {
    
    const length = 8;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }

    return result;
  }
}
