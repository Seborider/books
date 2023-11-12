import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../interfaces/IUser';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { IBook } from '../../../interfaces/IBook';
import { BookService } from '../../../services/books.service';

@Component({
    selector: 'books-edit-book',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit, OnDestroy {
    book!: IBook;
    private currentUserSubscription!: Subscription;
    currentUser: IUser | null = null;

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private bookService: BookService = inject(BookService);

    title$ = this.route.paramMap.pipe(map((params) => params.get('title')));
    title = this.route.snapshot.paramMap.get('title');

    editBookForm = new FormGroup({
        newTitle: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
        newAuthor: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
        newGenre: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
        ]),
    });
    ngOnInit() {
        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (data) => {
                if (data !== null) {
                    this.currentUser = data;
                    this.findBookByTitle();
                } else {
                    this.currentUser = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    onEditBook() {
        if (this.editBookForm.valid) {
            const title = this.title;
            if (!title) {
                console.error('Title not provided');
                return;
            }
            const { newTitle, newAuthor, newGenre } = this.editBookForm.value;
            if (this.currentUser && newTitle && newAuthor && newGenre) {
                this.bookService
                    .editBook(this.currentUser.username, title, {
                        newTitle,
                        newAuthor,
                        newGenre,
                    })
                    .subscribe({
                        next: () => {
                            this.router.navigateByUrl('/home');
                        },
                        error: (error) => {
                            console.error('Error editing book:', error);
                        },
                    });
            }
        }
    }

    findBookByTitle() {
        const title = this.title;
        if (!title || !this.currentUser) {
            return;
        }
        const book = this.currentUser.books.find(
            (book) => book.title === title
        );
        if (book) {
            this.editBookForm.get('newTitle')?.setValue(book.title);
            this.editBookForm.get('newAuthor')?.setValue(book.author);
            this.editBookForm.get('newGenre')?.setValue(book.genre);
        }
    }
}
