import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { IBook, IBookResponse } from '../../../interfaces/IBook';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { IUser } from '../../../interfaces/IUser';
import { AuthService } from '../../../services/auth-service';

@Component({
    selector: 'books-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class BookComponent implements OnInit, OnDestroy {
    book: IBook | null = null;
    private currentUserSubscription!: Subscription;
    currentUser: IUser | null = null;

    private bookService: BookService = inject(BookService);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private authService: AuthService = inject(AuthService);

    ngOnInit(): void {
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
        // Get the title from route parameter
        const title = this.route.snapshot.paramMap.get('title');

        if (title) {
            this.bookService
                .getBookByTitle(title, this.currentUser?.user?.username || '')
                .subscribe({
                    next: (bookResponse: IBookResponse) => {
                        this.book = bookResponse.book;
                    },
                    error: (error) => {
                        console.error('Error fetching book:', error);
                    },
                });
        }
    }

    ngOnDestroy() {
        //prevent memory leak when component destroyed
        this.currentUserSubscription.unsubscribe();
    }
}
