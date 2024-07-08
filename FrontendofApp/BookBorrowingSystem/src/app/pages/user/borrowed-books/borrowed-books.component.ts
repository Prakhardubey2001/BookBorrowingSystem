import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: any[] = [];
  loggedInUserId: string = '';

  displayedColumns: string[] = ['id', 'name', 'author', 'genre', 'description', 'rating', 'returnAction'];

  constructor(private bookService: BookService, private snackBar: MatSnackBar, private login: LoginService) {}

  ngOnInit(): void {
    this.getBorrowedBooks();
    this.loggedInUserId = this.login.getUser().userId;
  }

  getBorrowedBooks() {
    // Use the book service to get the borrowed books by the user
    this.bookService.getBorrowedBooks(this.loggedInUserId).subscribe({
      next: (response: any) => {
        this.borrowedBooks = response;
      },
       error: (error) => {
        console.error('Error fetching borrowed books:', error);
      }
    });
  }

  returnBook(book: any) {
    const confirmReturn = confirm('Are you sure you want to return this book?');
  
    if (confirmReturn) {
      this.bookService.returnBook(book.id).subscribe(
        () => {
          console.log('Book returned successfully');
          this.snackBar.open('Book returned successfully', 'Close', {
            duration: 3000,
          });
  
          // Update the local array to remove the returned book
          this.borrowedBooks = this.borrowedBooks.filter(b => b.id !== book.id);
        },
        (error) => {
          console.error('Error returning book:', error);
          this.snackBar.open('Error returning book', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
