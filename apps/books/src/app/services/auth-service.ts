import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable()
export class AuthService {
    //holds the current login status of the user. It is initially set to null and can emit true or false values later
    public isLoggedIn$ = new BehaviorSubject<boolean | null>(null);

    //holds the current user information
    private currentUserSubject: BehaviorSubject<IUser | null>;

    //provides a stream of the current user information
    public currentUser: Observable<IUser | null>;

    constructor() {
        //always call if auth-service is initiated
        const user: IUser | null = this.userFromLocalStorage();
        this.currentUserSubject = new BehaviorSubject<IUser | null>(user);
        this.currentUser = this.currentUserSubject.asObservable();
        this.isLoggedIn$.next(this.isUserLoggedIn());
    }

    //get the user from local storage and parse it into JS object, if none is set, return user as null
    private userFromLocalStorage(): IUser | null {
        const currentUserInLocalStorage = localStorage.getItem('currentUser');
        const user: IUser | null = currentUserInLocalStorage
            ? JSON.parse(currentUserInLocalStorage)
            : null;
        return user;
    }

    //get the current value of the currentUserSubject
    public get currentUserValue(): IUser | null {
        return this.currentUserSubject.value;
    }

    //set the authentication token for the current user
    public setToken(token: string): void {
        const user: IUser | null = this.userFromLocalStorage();
        if (user) {
            //give the user object the token property
            user.token = token;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }

        //set the expiration time to one hour from now
        const expiresAt = JSON.stringify(60 * 60 * 1000 + new Date().getTime()); // 60 mins * 60 secs * 1000 ms
        if (user) {
            user.expires_at = expiresAt;
            localStorage.setItem('currentUser', JSON.stringify(user));
            //update currentUserSubject
            this.currentUserSubject.next(user);
        }
        //update isLoggedIn state
        this.isLoggedIn$.next(this.isUserLoggedIn());
    }

    //check values of currentUser and comares to current time and returns boolean
    private isUserLoggedIn(): boolean {
        const user = this.currentUserValue;
        if (user && user.expires_at) {
            const expiresAt = JSON.parse(user.expires_at);
            return new Date().getTime() < expiresAt;
        }
        return false;
    }

    //delete currentUser fron localStorage and update isLoggedIn and currentUserSubject
    public logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.isLoggedIn$.next(false);
    }
}
