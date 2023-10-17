import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../interfaces/IUser';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PasswordMatch } from '../password-match';
import { ExistingUsername } from '../existing-username';

@Component({
    selector: 'books-edit-account',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit, OnDestroy {
    currentUser: IUser | null = null;
    private currentUserSubscription!: Subscription;

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    private userService: UserService = inject(UserService);
    private passwordMatch: PasswordMatch = inject(PasswordMatch);
    private uniqueUser: ExistingUsername = inject(ExistingUsername);

    updateUserForm = new FormGroup(
        {
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
                Validators.pattern(/^[a-zA-Z]+$/),
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
                Validators.pattern(/^[a-zA-Z]+$/),
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.email,
                Validators.pattern(
                    /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                ),
            ]),
            username: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-zA-Z0-9]+$/),
                ],
                this.uniqueUser.validate
            ),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(16),
            ]),
            passwordConfirmation: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(16),
            ]),
        },
        { validators: [this.passwordMatch.validate] }
    );
    ngOnInit() {
        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (data) => {
                if (data !== null) {
                    this.currentUser = data;
                } else {
                    this.currentUser = null;
                }
            }
        );
    }

    ngOnDestroy() {
        //prevent memory leak when component destroyed
        this.currentUserSubscription.unsubscribe();
    }

    submit(): void {
        const updatedUser = this.updateUserForm.value;

        this.userService
            .updateUser(this.currentUser?.user as IUser, updatedUser as IUser)
            .subscribe({
                next: () => {
                    this.authService.logout();
                    this.router.navigateByUrl('/login');
                },
            });
    }
}
