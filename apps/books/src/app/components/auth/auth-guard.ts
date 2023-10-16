import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { map, Observable, take } from 'rxjs';

@Injectable()
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(): Observable<boolean | UrlTree> {
        //get users logged in status
        return this.authService.isLoggedIn$.pipe(
            //take the first emitted value
            take(1),
            //if the user is not logged navigate to the /login route, and return false to deny access to the guarded route
            map((isLoggedIn): boolean | UrlTree => {
                if (!isLoggedIn) {
                    return this.router.parseUrl('/login'); // Return UrlTree
                }
                //if the user is logged in, return true to allow access to the guarded route
                return true;
            })
        );
    }
}
