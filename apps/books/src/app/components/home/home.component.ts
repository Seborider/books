import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { IBook } from '../../interfaces/IBook';
import { BookService } from '../../services/books.service';
import { PopupComponent } from '../popup/popup.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
    selector: 'books-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        PopupComponent,
        SearchBarComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: IUser | null = null;
    showForm = false;
    showPopup = false;
    searchPerformed = false;
    author: string | undefined;
    title!: string;
    books: IBook[] = [];
    currentBookTitle!: string;

    private currentUserSubscription!: Subscription;

    private router: Router = inject(Router);
    private authService: AuthService = inject(AuthService);
    private bookService: BookService = inject(BookService);

    addBookForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
        author: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
        genre: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
    });

    ngOnInit() {
        //subscribe to the currentUser observable from the AuthService, and updates the component's currentUser property when the observable emits new data
        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (data) => {
                if (data !== null) {
                    this.currentUser = data;
                } else {
                    //handle the case when the user is null, e.g., clear the user state
                    this.currentUser = null;
                }
            }
        );

        this.bookService.getBooks(this.currentUser?.username || '').subscribe(
            (response: IBook[]) => {
                this.books = response;
            },
            (error) => {
                console.error('Error fetching books:', error);
            }
        );
    }

    //lifecycle hook that is called just before Angular destroys the directive/component
    ngOnDestroy() {
        //prevent memory leak when component destroyed
        this.currentUserSubscription.unsubscribe();
    }

    toggleAddForm(): void {
        this.showForm = !this.showForm;
    }

    addBook(): void {
        if (this.addBookForm.valid) {
            const newBook = {
                title: this.addBookForm.get('title')?.value as string,
                author: this.addBookForm.get('author')?.value as string,
                genre: this.addBookForm.get('genre')?.value as string,
                username: this.currentUser?.username,
            };

            // Use the addBook method from BookService
            this.bookService.addBook(newBook).subscribe({
                next: () => {
                    // Handle successful book addition
                    this.books.push(newBook);
                    this.showForm = false;
                    this.addBookForm.reset();
                },
                error: (error) => {
                    // Handle error
                    console.error('Error adding book:', error);
                },
            });
        }
    }

    deleteBook(title: string): void {
        this.bookService
            .deleteBook(this.currentUser?.username || '', title)
            .subscribe({
                next: () => {
                    this.books = this.books.filter(
                        (book) => book.title !== title
                    );
                    this.togglePopup();
                },
                error: (error) => {
                    console.error('Error deleting book:', error);
                },
            });
    }

    navigateToBook(title: string): void {
        this.router.navigate(['/book', title]);
    }

    navigateToEditBook(title: string): void {
        this.router.navigate(['/editbook', title]);
    }

    togglePopup(title?: string): void {
        if (title) {
            this.currentBookTitle = title;
        }
        this.showPopup = !this.showPopup;
    }

    handleSearch(books: IBook[]): void {
        this.searchPerformed = true;
        this.books = books; // Update your books list with the search results
    }
}
