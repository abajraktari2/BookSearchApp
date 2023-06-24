import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../models/book.model';
import axios from 'axios';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @Input() results: Book[] = [];
  @Output() bookSelected: EventEmitter<Book> = new EventEmitter<Book>();

  selectedBookId: string | null = null;
  publishers: { [key: string]: string } = {}; // Stores publishers for each book
  numberOfPages: { [key: string]: string } = {}; // Stores number of pages for each book

  constructor() {}

  toggleImageSize(bookId: string) {
    if (this.selectedBookId === bookId) {
      this.selectedBookId = null; // Deselect the book if it's already selected
    } else {
      this.selectedBookId = bookId; // Select the book if it's not selected
    }
  }

  initializeResults() {
    this.results = this.results.map(book => ({
      ...book,
      showHighResImage: false
    }));
  }

  displayHighResImage(book: Book) {
    if (book.highResCoverUrl) {
      window.open(book.highResCoverUrl, '_blank');
    }
  }

  viewDetails(book: Book) {
    this.bookSelected.emit(book);
  }

  toggleBookDetails(bookId: string) {
    if (this.selectedBookId === bookId) {
      this.selectedBookId = null; // Deselect the book if it's already selected
    } else {
      this.selectedBookId = bookId; // Select the book if it's not selected
    }

    const book = this.results.find(book => book.id === bookId); // Find the book in the results array
    if (book) {
      this.getPublishedYear(book);
      this.getPublishers(book);
      this.getNumberOfPages(book);
    }
  }

  /**
   * Fetches the published year for a book from the Open Library API based on its ISBN.
   * Updates the 'publishedYear' property of the book.
   * If the ISBN is not available, sets the published year as 'N/A'.
   */
  getPublishedYear(book: Book): void {
    if (book.ISBN) {
      const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${book.ISBN}&format=json&jscmd=data`;

      axios
        .get(apiUrl)
        .then(response => {
          const bookData = response.data[`ISBN:${book.ISBN}`];
          if (bookData && bookData.publish_date) {
            book.publishedYear = bookData.publish_date;
          } else {
            book.publishedYear = 'N/A';
          }
        })
        .catch(() => {
          book.publishedYear = 'N/A';
        });
    } else {
      book.publishedYear = 'N/A';
    }
  }

  /**
   * Fetches the publishers for a book from the Open Library API based on its ISBN.
   * Updates the 'publishers' property of the book.
   * If the ISBN is not available or there are no publishers, sets the publishers as 'N/A'.
   */
  getPublishers(book: Book) {
    if (book.ISBN) {
      const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${book.ISBN}&format=json&jscmd=data`;

      axios.get(apiUrl)
        .then(response => {
          const bookData = response.data[`ISBN:${book.ISBN}`];
          if (bookData && bookData.publishers && bookData.publishers.length > 0) {
            book.publishers = bookData.publishers.map((publisher: any) => publisher.name).join(', ');
          } else {
            book.publishers = 'N/A';
          }
        })
        .catch(() => {
          book.publishers = 'N/A';
        });
    } else {
      book.publishers = 'N/A';
    }
  }
  
  /**
   * Fetches the number of pages for a book from the Open Library API based on its ISBN.
   * Updates the 'numberOfPages' property of the book.
   * If the ISBN is not available or the number of pages is not provided, sets the number of pages as 'N/A'.
   */
  getNumberOfPages(book: Book) {
    if (book.ISBN) {
      const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${book.ISBN}&format=json&jscmd=data`;

      axios.get(apiUrl)
        .then(response => {
          const bookData = response.data[`ISBN:${book.ISBN}`];
          if (bookData && bookData.number_of_pages) {
            book.numberOfPages = bookData.number_of_pages;
          } else {
            book.numberOfPages = 'N/A';
          }
        })
        .catch(() => {
          book.numberOfPages = 'N/A';
        });
    } else {
      book.numberOfPages = 'N/A';
    }
  }
}
