import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'books-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: IUser | null = null;
    private currentUserSubscription!: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        //ubscribe to the currentUser observable from the AuthService, and updates the component's currentUser property when the observable emits new data
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
    }

    //lifecycle hook that is called just before Angular destroys the directive/component
    ngOnDestroy() {
        //prevent memory leak when component destroyed
        this.currentUserSubscription.unsubscribe();
    }
}
