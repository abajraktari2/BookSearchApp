import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) { }
// Asynchronous function
  searchBooksByTitle(title: string) {
    const url = `${this.baseUrl}?title=${encodeURIComponent(title)}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const searchResults = response.docs.map((book: any) => ({
          id: book.key,
          title: book.title,
          author: book.author_name?.[0] || 'N/A',
          description: book.description || 'No description available',
          ISBN: book.isbn?.[0] || 'N/A',
          coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : 'https://example.com/default-cover.jpg',
            highResCoverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : '',
          authorWebsite: `https://openlibrary.org/authors/${book.author_key?.[0]}`
        }));
        return { docs: searchResults };
      })
    );
  }

  searchBooksByAuthor(author: string) {
    const url = `${this.baseUrl}?author=${encodeURIComponent(author)}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const searchResults = response.docs.map((book: any) => {
          const coverId = book.cover_i;
          return {
            id: book.key,
            title: book.title,
            author: book.author_name?.[0] || 'N/A',
            description: book.description || 'No description available',
            ISBN: book.isbn?.[0] || 'N/A',
            coverUrl: coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              : 'https://example.com/default-cover.jpg',
              highResCoverUrl: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : '',
            authorWebsite: `https://openlibrary.org/authors/${book.author_key?.[0]}`,
            
          };
        });
        return { docs: searchResults };
      })
    );
  }
  

  searchBooksBySubject(subject: string) {
    const url = `${this.baseUrl}?subject=${encodeURIComponent(subject)}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const searchResults = response.docs.map((book: any) => ({
          id: book.key,
          title: book.title,
          author: book.author_name?.[0] || 'N/A',
          description: book.description || 'No description available',
          ISBN: book.isbn?.[0] || 'N/A',
          coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : 'https://example.com/default-cover.jpg',
            highResCoverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : '',
          authorWebsite: `https://openlibrary.org/authors/${book.author_key?.[0]}`
        }));
        return { docs: searchResults };
      })
    );
  }
  

  getBookDetails(bookId: string) {
    const url = `https://openlibrary.org/works/${bookId}.json`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const coverUrl = this.getCoverImageUrl(response);
        const highResCoverUrl = this.getHighResCoverImageUrl(response);
        return { ...response, coverUrl, highResCoverUrl };
      })
    );
  }
  
  
  

  private getCoverImageUrl(response: any): string {
    const coverKeys = ['ISBN', 'OCLC', 'LCCN', 'OLID', 'ID'];
    const size = 'S';
    
    for (const key of coverKeys) {
      if (response[key]) {
        const value = Array.isArray(response[key]) ? response[key][0] : response[key];
        return `https://covers.openlibrary.org/b/${key.toLowerCase()}/${value}-${size}.jpg`;
      }
    }
  
    return 'No cover'; // Return a default image URL or handle missing covers as needed
  }
  private getHighResCoverImageUrl(response: any): string {
    if (response?.covers?.length) {
      const coverId = response.covers[0];
      return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }
    return '';
  }
  
  

  
}
