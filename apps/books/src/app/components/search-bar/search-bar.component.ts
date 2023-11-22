import {
    Component,
    inject,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BookService } from '../../services/books.service';
import {
    debounceTime,
    distinctUntilChanged,
    Subject,
    Subscription,
} from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth-service';
import { IBook } from '../../interfaces/IBook';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'books-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, NgOptimizedImage],
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
    searchTerm = '';
    @Output() searchResults = new EventEmitter<IBook[]>();
    currentUser: IUser | null = null;

    private searchTerms = new Subject<string>();
    private currentUserSubscription!: Subscription;
    private bookService: BookService = inject(BookService);
    private authService: AuthService = inject(AuthService);

    useOpenLibrary = false;

    ngOnInit() {
        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (data) => {
                if (data !== null) {
                    this.currentUser = data;
                    this.fetchAllBooks();
                } else {
                    this.currentUser = null;
                    this.searchResults.emit([]);
                }
            }
        );

        this.searchTerms
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((term) => this.onSearch(term));
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    onSearchChange(term: string): void {
        this.searchTerms.next(term);
    }

    private onSearch(term: string): void {
        if (term) {
            if (this.useOpenLibrary) {
                this.bookService.searchBooksOpenLibrary(term).subscribe({
                    next: (books: IBook[]) => this.searchResults.emit(books),
                    error: (err) =>
                        console.error('Error fetching search results:', err),
                });
            } else {
                this.bookService
                    .searchBooks(
                        this.currentUser?.user?.username as string,
                        term
                    )
                    .subscribe({
                        next: (books: IBook[]) =>
                            this.searchResults.emit(books),
                        error: (err) =>
                            console.error(
                                'Error fetching search results:',
                                err
                            ),
                    });
            }
        } else {
            // Fetch all books if the search term is empty
            this.fetchAllBooks();
        }
    }

    private fetchAllBooks(): void {
        this.bookService
            .getBooks(this.currentUser?.user?.username as string)
            .subscribe({
                next: (books: IBook[]) => this.searchResults.emit(books),
                error: (err) => console.error('Error fetching books:', err),
            });
    }
}
