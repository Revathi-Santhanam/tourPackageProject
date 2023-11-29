import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/apiResponse';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private http: HttpClient) {}
  getDestinations(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/category/all`
    );
  }

  getDestinationsForUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${urlEndpoint.baseUrl}/category/all`);
  }
  getDestinationTour(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${urlEndpoint.baseUrl}/tour/category/${id}`
    );
  }
  postCategory(category: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/category`,
      category
    );
  }
  deleteCategory(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/category/${id}`
    );
  }
  putCategory(category: FormData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/category`,
      category
    );
  }
  getCategoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${urlEndpoint.baseUrl}/admin/category/${id}`
    );
  }
}
