import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, SignupComponent],
  selector: 'books-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'books';
}
