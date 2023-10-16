import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook, IBookEdited, IBookResponse } from '../interfaces/IBook';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

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
}
