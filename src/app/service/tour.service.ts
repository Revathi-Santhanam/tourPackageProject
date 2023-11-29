import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { ApiResponse } from '../model/apiResponse';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  constructor(private http: HttpClient) {}
  getTours(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/admin/tour/all`);
  }

  getAllToursForUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/tour/all`);
  }

  getTourDetails(id:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/tour/${id}`);
  }
  deleteTour(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/tour/${id}`
    );
  }
  postTour(tour: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/tour`,tour
    );
  }
  putTour(tour: Tour): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/tour`,
      tour
    );
  }

}
