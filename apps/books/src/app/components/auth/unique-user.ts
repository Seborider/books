import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UniqueUsername implements AsyncValidator {
    constructor(private userService: UserService) {}

    validate = (control: AbstractControl) => {
        const { value } = control;
        return this.userService.usernameAvailabe(value).pipe(
            map((response) => {
                if (response.exists) {
                    return { existingUser: true };
                }
                return null;
            }),
            catchError((err) => {
                console.log('Error caught in UniqueUsername:', err);
                return of({ noConnection: true });
            })
        );
    };
}
