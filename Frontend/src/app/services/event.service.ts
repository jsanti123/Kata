import { inject, Injectable } from '@angular/core';
import { Event, ApiResponse, ApiResponseEvents } from '../interfaces/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/api';
  }

  getEvents(): Observable<ApiResponseEvents> {
    return this.http.get<ApiResponseEvents>(`${this.myAppUrl}/events`);
  }

  deleteEvent(eventId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.myAppUrl}/event/${eventId}`);
  }

  createEvent(event: Event): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.myAppUrl}/event`, event);
  }

  getEventById(eventId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.myAppUrl}/event/${eventId}`);
  }

  updateEvent(event: Event, id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.myAppUrl}/event/${id}`, event);
  }

}
