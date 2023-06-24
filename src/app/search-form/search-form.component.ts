import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  searchQuery: string = ''; // Holds the search query entered by the user
  selectedSearchCriteria: string = ''; // Holds the selected search criteria (title, author, subject)
  searchResults: any[] = []; // Holds the search results (update the type as per your Book model or interface)

  constructor(private bookService: BookService) {}

  search() {
    // Perform search based on the selected search criteria
    if (this.selectedSearchCriteria === 'title') {
      // Call the bookService method to search books by title
      this.bookService.searchBooksByTitle(this.searchQuery)
        .subscribe((results: any) => {
          this.searchResults = results.docs; // Assuming the response has a 'docs' property with the search results
        });
    } else if (this.selectedSearchCriteria === 'author') {
      // Call the bookService method to search books by author
      this.bookService.searchBooksByAuthor(this.searchQuery)
        .subscribe((results: any) => {
          this.searchResults = results.docs;
        });
    } else if (this.selectedSearchCriteria === 'subject') {
      // Call the bookService method to search books by subject
      this.bookService.searchBooksBySubject(this.searchQuery)
        .subscribe((results: any) => {
          this.searchResults = results.docs;
        });
    }
  }
}
