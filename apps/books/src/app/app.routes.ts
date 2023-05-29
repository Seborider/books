import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SignupSuccessfulComponent } from './components/auth/signup-successful/signup-successful.component';
import { AuthGuard } from './components/auth/auth-guard';
import { AccountComponent } from './components/auth/account/account.component';
import { EditAccountComponent } from './components/auth/edit-account/edit-account.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signupSuccessful', component: SignupSuccessfulComponent },
    {
        path: 'home',
        component: HomeComponent,
        //implement guarded route
        canActivate: [AuthGuard],
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'editaccount',
        component: EditAccountComponent,
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
