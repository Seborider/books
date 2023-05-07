import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'books-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor() {}

    loginUserForm = new FormGroup({
        username: new FormControl('', []),
        password: new FormControl('', []),
    });

    submit() {
        console.log('login', this.loginUserForm);
    }
}
