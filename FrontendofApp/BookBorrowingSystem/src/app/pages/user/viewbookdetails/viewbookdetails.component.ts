import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-viewbookdetails',
  templateUrl: './viewbookdetails.component.html',
  styleUrls: ['./viewbookdetails.component.css']
})
export class ViewbookdetailsComponent implements OnInit {

  bookDetails: any;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['id'];

    this.bookService.getBookDetails(bookId).subscribe(
      (response: any) => {
        this.bookDetails = response;
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookService } from 'src/app/services/book.service';

// @Component({
//   selector: 'app-viewbookdetails',
//   templateUrl: './viewbookdetails.component.html',
//   styleUrls: ['./viewbookdetails.component.css']
// })
// export class ViewbookdetailsComponent implements OnInit {

//   bookDetails: any;

//   constructor(private route: ActivatedRoute, private bookService: BookService) {}

//   async ngOnInit(): Promise<void> {
//     const bookId = this.route.snapshot.params['id'];

//     try {
//       this.bookDetails = await this.bookService.getBookDetails(bookId).toPromise();
//     } catch (error) {
//       console.error('Error fetching book details:', error);
//     }
//   }

// }
