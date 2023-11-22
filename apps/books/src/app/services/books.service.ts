import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    IBook,
    IBookEdited,
    IBookOpenLibResponse,
    IBookResponse,
} from '../interfaces/IBook';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private apiUrl = 'http://localhost:3000/api';
    private http: HttpClient = inject(HttpClient);

    addBook(newBook: IBook): Observable<IBook> {
        return this.http.post<IBook>(
            `${this.apiUrl}/users/books/:book`,
            newBook
        );
    }
    getBooks(username: string): Observable<IBook[]> {
        return this.http
            .get<{ books: IBook[] }>(`${this.apiUrl}/users/books`, {
                params: { username },
            })
            .pipe(map((response) => response.books));
    }

    getBookByTitle(title: string, username: string): Observable<IBookResponse> {
        return this.http.get<IBookResponse>(
            `${this.apiUrl}/users/books/${title}`,
            { params: { username } }
        );
    }

    deleteBook(username: string, title: string): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/users/books/${username}/${title}`
        );
    }

    editBook(
        username: string,
        title: string,
        editedBook: IBookEdited
    ): Observable<IBookEdited> {
        return this.http.put<IBookEdited>(
            `${this.apiUrl}/users/books/${username}/${title}`,
            editedBook
        );
    }
    searchBooks(username: string, searchTerm: string): Observable<IBook[]> {
        return this.http
            .get<{ books: IBook[] }>(`${this.apiUrl}/users/books/search`, {
                params: { username, searchTerm },
            })
            .pipe(map((response) => response.books));
    }

    searchBooksOpenLibrary(searchTerm: string): Observable<IBook[]> {
        const apiUrl = 'http://openlibrary.org/search.json';
        const url = `${apiUrl}?q=${encodeURIComponent(searchTerm)}`;
        return this.http
            .get<{ docs: IBookOpenLibResponse[] }>(url)
            .pipe(
                map((response) =>
                    response.docs.map((book) =>
                        this.mapOpenLibBookToIBook(book)
                    )
                )
            );
    }

    private mapOpenLibBookToIBook(book: IBookOpenLibResponse): IBook {
        return {
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : '',
            isbn: book.isbn ? parseInt(book.isbn[0]) : undefined,
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : undefined,
            id: book.key,
        };
    }
}
