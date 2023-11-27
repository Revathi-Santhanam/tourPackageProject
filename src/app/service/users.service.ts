import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/apiResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/admin/user/all`);
  }
}
