import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  private baseUrl = 'https://localhost:44374/api/Book/'; 

  constructor(private http: HttpClient) {}

  addBook(bookData: any): Observable<any> {
    const url = `${this.baseUrl}ToCreateBook`;

    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    return this.http.post(url, bookData, { headers }).pipe(
      catchError(error => {
        console.error('Error adding book:', error);
        throw error; 
      })
    );
  }
}
