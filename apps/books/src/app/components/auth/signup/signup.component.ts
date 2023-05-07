import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../types/user';
import { Router } from '@angular/router';
import { PasswordMatch } from '../password-match';
import { UniqueUsername } from '../unique-user';

@Component({
    selector: 'books-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    constructor(
        private signupService: UserService,
        private router: Router,
        private passwordMatch: PasswordMatch,
        private uniqueUser: UniqueUsername
    ) {}
    signupUserForm = new FormGroup(
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
            checkbox: new FormControl(false, [Validators.requiredTrue]),
        },
        { validators: [this.passwordMatch.validate] }
    );

    submit(): void {
        if (
            this.signupUserForm.controls.checkbox.value &&
            this.signupUserForm.valid
        ) {
            const user = this.signupUserForm.value;
            this.signupService.signup(user as User).subscribe({
                next: () => {
                    this.router.navigateByUrl('/home');
                },
            });
        }
    }
}
