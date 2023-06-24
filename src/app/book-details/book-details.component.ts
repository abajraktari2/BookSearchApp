import { Component, Input } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input() book: Book = {} as Book;

  showHighResCover() {
    if (this.book.highResCoverUrl) {
      this.book.coverUrl = this.book.highResCoverUrl;
    }
  }
  
}
