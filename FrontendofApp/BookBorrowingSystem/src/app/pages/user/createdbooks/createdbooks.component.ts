import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createdbooks',
  templateUrl: './createdbooks.component.html',
  styleUrls: ['./createdbooks.component.css']
})
export class CreatedbooksComponent implements OnInit {
  books: any[] = []; 
  loggedInUserId: string = '';
  currentuser: string = ''; 
  bookUpdateSuccess = false;

  displayedColumns: string[] = ['name', 'author', 'genre', 'description', 'rating', 'is_Book_Available', 'actions'];
  editForm: FormGroup;
  selectedBook: any;
  constructor(private bookService: BookService,private login:LoginService,private fb: FormBuilder,private router:Router, private snackBar: MatSnackBar) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      author: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      genre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      is_Book_Available: [ true],
    });
  }

  ngOnInit(): void {
   
    this.getCreatedBooks();
    
    
    this.loggedInUserId = this.login.getUser().userId;
    this.currentuser = this.login.getUser().name;
  }

  getCreatedBooks() {
   
    this.bookService.getCreatedBooks(this.loggedInUserId).subscribe(
      (response: any) => {
        this.books = response;
        console.log(this.books);
      },
      (error) => {
        console.error('Error fetching created books:', error);
      }
    );
  }

  editBook(book: any) {
    // Set the selected book and open the edit form
    this.selectedBook = book;
    this.editForm.patchValue(book);
  }

  deleteBook(book: any) {
    // Confirm deletion with the user (optional)
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');

    if (confirmDelete) {
      // Call your book service to delete the book
      this.bookService.deleteBook(book.id).subscribe(
        (response: any) => {
          // Remove the deleted book from the local array
          this.books = this.books.filter(b => b.id !== book.id);
          console.log('Book deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
  submitEditForm() {
    // Get the updated book details from the form
    const updatedBook = this.editForm.value;

    // Make a PUT request to update the book
    this.bookService.updateBook(this.selectedBook.id, updatedBook).subscribe(
      (response: any) => {
        // Update the local array with the edited book details
        const index = this.books.findIndex(b => b.id === this.selectedBook.id);
        if (index !== -1) {
          this.books[index] = { ...this.selectedBook, ...updatedBook };
        }

        // Close the edit form
        this.selectedBook = null;

        // Set the success flag
        this.bookUpdateSuccess = true;

        
        Swal.fire('Success', 'Book updated successfully', 'success').then(() => {
          // Navigate to the desired route upon success
          setTimeout(() => {
               this.router.navigate(['/user-dashboard/showbooks']);
            }, 0.1);
            setTimeout(() => {
              this.router.navigate(['/user-dashboard/createdbooks']);
            }, 2);

                  });
                 


      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }
}  


