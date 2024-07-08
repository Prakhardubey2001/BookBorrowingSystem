import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  loggedInUserId: string = '';
  displayedColumns: string[] = ['name', 'author', 'genre', 'description', 'rating', 'is_Book_Available', 'actions'];
  dataSource = new MatTableDataSource<any>(this.books);
  searchQuery: string = '';
  selectedSearchCriteria: string[] = ['author','name','genre'];
  searchCriteriaOptions: string[] = ['author', 'name', 'genre'];

  constructor(private bookService: BookService, private router: Router,private login:LoginService,private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBooks();
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
  searchBooks() {
    if (this.searchQuery) {
      const lowerCaseSearchQuery = this.searchQuery.toLowerCase(); // Convert to lowercase
  
      const apiUrl = `https://localhost:44374/api/Book/ToGetAlltheBooks?filterOn=${this.selectedSearchCriteria}&filterQuery=${lowerCaseSearchQuery}`;
  
      this.bookService.searchBooks(apiUrl).subscribe(
        (response: any) => {
          this.books = response.map((book: any) => ({
            ...book,
            // Convert relevant properties to lowercase for case-insensitive comparison
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
