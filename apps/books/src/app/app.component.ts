import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth-service';

@Component({
    standalone: true,
    imports: [RouterModule, LoginComponent, SignupComponent, AsyncPipe, NgIf],
    selector: 'books-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'books';
    isLoggedIn$!: Observable<boolean | null>;

    constructor(public authService: AuthService) {}

    //ngOnInit is a lifecycle hook method that gets called once after Angular has set up the component
    ngOnInit() {
        //set isLoggedIn$ to the current login status from AuthService
        this.isLoggedIn$ = this.authService.isLoggedIn$;
    }
}
