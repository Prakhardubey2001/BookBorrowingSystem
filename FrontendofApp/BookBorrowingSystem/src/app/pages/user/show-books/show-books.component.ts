import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css'],
  preserveWhitespaces: true
})
export class ShowBooksComponent implements OnInit {
  books: any[] = [];
  loggedInUserId: string = '';
  displayedColumns: string[] = ['name', 'author', 'genre', 'description', 'rating', 'is_Book_Available', 'actions'];
  dataSource = new MatTableDataSource<any>(this.books);
  searchQuery: string = '';
  selectedSearchCriteria: string[] = ['author','name','genre'];
  searchCriteriaOptions: string[] = ['author', 'name', 'genre'];

  constructor(private bookService: BookService, private router: Router,private login:LoginService,private dialog: MatDialog,
  private snackBar: MatSnackBar  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.loggedInUserId = this.login.getUser().userId;
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe(
      (response: any) => {
        this.books = response;
        this.dataSource.data = this.books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  viewDetails(book: any) {
    this.router.navigate(['user-dashboard/viewbookdetails', book.id]);
  }

  issueBook(book: any) {
    
    const isConfirmed = window.confirm('Are you sure you want to issue this book?');
  
    
    if (isConfirmed) {
      
      this.bookService.issueBook(book.id).subscribe(
        (response: any) => {
          console.log('Book issued successfully:', response);
          this.snackBar.open('Book issued successfully', 'Close', {
            duration: 3000,
          });
         
           setTimeout(() => {
            this.router.navigate(['/user-dashboard/createdbooks']);
          }, 2);
          setTimeout(() => {
            this.router.navigate(['/user-dashboard/showbooks']);
          }, 2000);
        },
        (error) => {
          console.error('Error issuing book:', error);
          this.snackBar.open('Error issuing book May be you have no tokens please check!!!', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      
      console.log('Action canceled');
    }
  }
  

  searchBooks() {
    if (this.searchQuery) {
      const lowerCaseSearchQuery = this.searchQuery.toLowerCase(); 
  
      const apiUrl = `https://localhost:44374/api/Book/ToGetAlltheBooks?filterOn=${this.selectedSearchCriteria}&filterQuery=${lowerCaseSearchQuery}`;
  
      this.bookService.searchBooks(apiUrl).subscribe(
        (response: any) => {
          this.books = response.map((book: any) => ({
            ...book,
            
            author: book.author.toLowerCase(),
            name: book.name.toLowerCase(),
            genre: book.genre.toLowerCase(),
          }));
          this.dataSource.data = this.books;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.getBooks();
    }
  }
  
  refreshSearch() {
    this.searchQuery = '';
    this.getBooks();
  }
}
