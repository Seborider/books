import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SignupSuccessfulComponent } from './components/auth/signup-successful/signup-successful.component';
import { canActivateAuthGuard } from './components/auth/auth-guard';
import { AccountComponent } from './components/auth/account/account.component';
import { EditAccountComponent } from './components/auth/edit-account/edit-account.component';
import { BookComponent } from './components/books/book/book.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signupSuccessful', component: SignupSuccessfulComponent },
    {
        path: 'home',
        component: HomeComponent,
        //implement guarded route
        canActivate: [canActivateAuthGuard],
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [canActivateAuthGuard],
    },
    {
        path: 'editaccount',
        component: EditAccountComponent,
        canActivate: [canActivateAuthGuard],
    },
    {
        path: 'book/:title',
        component: BookComponent,
        canActivate: [canActivateAuthGuard],
    },
    {
        path: 'editbook/:title',
        component: EditBookComponent,
        canActivate: [canActivateAuthGuard],
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
