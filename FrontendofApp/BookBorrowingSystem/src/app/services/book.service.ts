import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://localhost:44374/api/Book/';
  private thiUrl='https://localhost:44374/api/IssueAgreement/ToGetAlltheBooksCreatedBythatUser';
  private apiUrl = 'https://localhost:44374/api/IssueAgreement';
  private issueAgreementUrl = 'https://localhost:44374/api/IssueAgreement/';
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    const url = `${this.baseUrl}ToGetAlltheBooks`;

    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    return this.http.get<any[]>(url, { headers });
  }
  getBookDetails(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${bookId}`);
  }
  searchBooks(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }
  getCreatedBooks(userId: string): Observable<any> {
    const url = `${this.thiUrl}?userId=${userId}`;
    return this.http.get(url);
  }
  deleteBook(bookId: number): Observable<any> {
    const url = `${this.baseUrl}DeleteBook/${bookId}`;
    return this.http.delete(url);
  }
  updateBook(bookId: number, updatedBook: any): Observable<any> {
    const url = `${this.baseUrl}Updatebook/${bookId}`;
    return this.http.put(url, updatedBook);
  }
  issueBook(bookId: number): Observable<any> {
    const url = `${this.apiUrl}/issuebook/${bookId}`;
    return this.http.get(url);
  }
  getBorrowedBooks(userId: string): Observable<any[]> {
    const url = `${this.issueAgreementUrl}ToGetAllTheBorrowedBooksBythatUser?userId=${userId}`;

    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    return this.http.get<any[]>(url, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching borrowed books:', error);
        throw error;
      })
    );
  }
  returnBook(bookId: number): Observable<any> {
    const url = `${this.issueAgreementUrl}ReturnBook/${bookId}`;
  
    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');
  
    
    return this.http.get(url, { headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error returning book:', error);
        throw error;
      })
    );
  }
}

