import { Component } from '@angular/core';
import { Book } from './models/book.model';
import { BookService } from './book.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SearchFormComponent } from './search-form/search-form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-search-app';
  searchQuery: string = '';
  searchResults: Book[] = [];
  selectedBook!: Book ;

  selectedSearchCriteria: string = 'title'; // Default search criteria

  constructor(private bookService: BookService) { }

  search() {
    if (this.searchQuery.trim()) {
      switch (this.selectedSearchCriteria) {
        case 'title':
          this.bookService.searchBooksByTitle(this.searchQuery).subscribe((response: any) => {
            this.searchResults = response.docs;
          });
          break;
        case 'author':
          this.bookService.searchBooksByAuthor(this.searchQuery).subscribe((response: any) => {
            this.searchResults = response.docs;
          });
          break;
        case 'subject':
          this.bookService.searchBooksBySubject(this.searchQuery).subscribe((response: any) => {
            this.searchResults = response.docs;
          });
          break;
      }
    }
  }

  viewDetails(book: Book) {
    this.selectedBook = book;
  }
  displayHighResImage(book: Book) {
    if (book.highResCoverUrl) {
      window.open(book.highResCoverUrl, '_blank');
    }
  }
  
}
