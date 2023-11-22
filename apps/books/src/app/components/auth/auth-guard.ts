import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { map, Observable, take } from 'rxjs';
import { inject } from '@angular/core';

export const canActivateAuthGuard: CanActivateFn = (): Observable<
    boolean | UrlTree
> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log('in canActivateAuthGuard');
    return authService.isLoggedIn$.pipe(
        take(1),
        map((isLoggedIn): boolean | UrlTree => {
            return isLoggedIn ? true : router.parseUrl('/login');
        })
    );
};
