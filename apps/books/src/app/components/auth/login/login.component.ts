import { Component } from '@angular/core';
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

@Component({
    selector: 'books-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(
        private uniqueUser: ExistingUsername,
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {}

    loginUserForm = new FormGroup({
        username: new FormControl('', [], this.uniqueUser.validate),
        password: new FormControl('', [Validators.minLength(8)]),
    });

    submit() {
        //point to values from the login form
        const user = this.loginUserForm.value;
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
        });
    }
}
