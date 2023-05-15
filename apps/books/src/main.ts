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
import { AuthGuard } from './app/components/auth/auth-guard';
import { AuthService } from './app/services/auth-service';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(),
        UserService,
        PasswordMatch,
        ExistingUsername,
        AuthGuard,
        AuthService,
    ],
}).catch((err) => console.error(err));
