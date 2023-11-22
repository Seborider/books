import { bootstrapApplication } from '@angular/platform-browser';
import {
    provideRouter,
    withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './app/services/user.service';
import { PasswordMatch } from './app/components/auth/password-match';
import { ExistingUsername } from './app/components/auth/existing-username';
import { AuthService } from './app/services/auth-service';
import { PasswordCorrect } from './app/components/auth/password-correct';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(),
        UserService,
        PasswordMatch,
        ExistingUsername,
        AuthService,
        PasswordCorrect,
    ],
}).catch((err) => console.error(err));
