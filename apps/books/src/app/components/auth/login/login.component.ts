import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ExistingUsername } from '../existing-username';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth-service';
import { PasswordCorrect } from '../password-correct';

@Component({
    selector: 'books-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    submitClicked = false;

    private uniqueUser: ExistingUsername = inject(ExistingUsername);
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);
    private authService: AuthService = inject(AuthService);
    private passwordCorrect: PasswordCorrect = inject(PasswordCorrect);

    loginUserForm = new FormGroup({
        username: new FormControl('', [], this.uniqueUser.validate),
        password: new FormControl(''),
    });

    submit() {
        this.submitClicked = true;
        this.setValidators();

        //point user to values from the login form
        const user = this.loginUserForm.value;

        //reset form state
        this.loginUserForm.markAsPending();

        //handle the observable returned by the login method of user-service
        this.userService.login(user as IUser).subscribe({
            //take the server's response
            next: (response: HttpResponse<IUser>) => {
                //store the user's information from the response body in the browser's local storage
                const token = response.headers.get('Authorization');
                if (token) {
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(response.body)
                    );
                    this.authService.setToken(token);
                    //navigate to /home if token is set and therefore allowed by auth-guard
                    this.router.navigateByUrl('/home');
                } else {
                    // Handle missing token
                    console.error('No token in response');
                }
            },
            error: () => {
                this.loginUserForm.setErrors({ invalidCredentials: true });
            },
        });
    }

    //avoid validating the password on initialisation of component
    setValidators() {
        const passwordControl = this.loginUserForm.get('password');

        if (passwordControl) {
            passwordControl.setValidators([Validators.minLength(8)]);
            passwordControl.setAsyncValidators(this.passwordCorrect.validate);
            //re-calculates the value and validation status of the control
            passwordControl.updateValueAndValidity();
        }
    }
}
