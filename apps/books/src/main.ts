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
import {UniqueUsername} from "./app/components/auth/unique-user";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    UserService,
    PasswordMatch,
    UniqueUsername
  ],
}).catch((err) => console.error(err));
