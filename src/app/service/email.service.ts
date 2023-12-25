import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/apiResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  constructor(private http:HttpClient, ) { }
  sendEmail(email:String):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${urlEndpoint.baseUrl}/email/sendEmail`,
      email
    );
  }
}
