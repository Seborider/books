import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { Router, RouterLink } from '@angular/router';
import { PasswordMatch } from '../password-match';
import { ExistingUsername } from '../existing-username';

//component decorator provides 'metadata' about the component
@Component({
    selector: 'books-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})

//create the class
export class SignupComponent {
    //inject dependencies as private properties
    constructor(
        private signupService: UserService,
        private router: Router,
        private passwordMatch: PasswordMatch,
        private uniqueUser: ExistingUsername
    ) {}

    //new instance of Angular FormGroup class (represents the form) is initialized
    signupUserForm = new FormGroup(
        {
            //new instances of Angular formCorntrol classes (representing each input) are initialized
            firstName: new FormControl('', [
                //Validator classes are initialized with different methods:
                //1. input is required
                Validators.required,
                //2. input must have minimum lenght of 2 characters
                Validators.minLength(2),
                //3. input can't have more than 20 characters
                Validators.maxLength(20),
                //4. input must match this regex pattern:
                // - ^: pattern must match from the beginning of the string
                // - [a-zA-Z]: only alphabetical characters in upper- or lower-case
                // - +: one or more characters
                // - $: pattern must match until the end of the string
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
                // input must have minimum 3 characters for email validator to work
                Validators.email,
                // additional regex validation:
                // - [a-zA-Z0-9._%-]+: only alphabetical characters in upper- or lower-case, digits, . - % _
                // - @: must have @
                // - \.: must have . in domains
                // - [a-zA-Z]{2,4}: must match between 2 and 4 alphabetical characters in upper- or lower-case
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
        //optional validator calling validate method of passwordMatch class
        { validators: [this.passwordMatch.validate] }
    );

    //submit form
    submit(): void {
        //only submit if checkbox is checked and form is valid
        if (
            this.signupUserForm.controls.checkbox.value &&
            this.signupUserForm.valid
        ) {
            // point form values to user
            const user = this.signupUserForm.value;
            //call signup method of signupServide class, pass the form as tyoe of IUser. It returns an Observable, so it can be subscribed to
            this.signupService.signup(user as IUser).subscribe({
                //redirect to '/signupSuccessful' - route
                next: () => {
                    this.router.navigateByUrl('/signupSuccessful');
                },
            });
        }
    }
}
