import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddBookService } from 'src/app/services/add-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private addBookService: AddBookService) {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      author: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      genre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/)]],
      description: ['',[Validators.required, Validators.maxLength(200)]],
      isBookAvailable: [false, Validators.required]
    });
  }

  ngOnInit(): void {}

  // addBook(): void {
  //   if (this.bookForm.valid) {
  //     const formData = this.bookForm.value;

  //     this.addBookService.addBook(formData).subscribe(
  //       (response: any) => {
  //         console.log('Book added successfully:', response);
  //         // You can navigate to the desired route upon success
  //         Swal.fire('Success', 'Book added successfully', 'success').then(() => {
  //           // Navigate to the desired route upon success
  //           this.router.navigate(['/user-dashboard']);
  //         });
  //       },
  //       (error) => {
  //         console.error('Error adding book:', error);
  //       }
  //     );
  //   }
  // }

  addBook(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
  
      this.addBookService.addBook(formData).subscribe({
        next: (response: any) => {
          console.log('Book added successfully:', response);
          // You can navigate to the desired route upon success
          Swal.fire('Success', 'Book added successfully', 'success').then(() => {
            // Navigate to the desired route upon success
            this.router.navigate(['/user-dashboard']);
          });
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
    }
  }


  clearForm(): void {
    this.bookForm.reset();
  }
}
