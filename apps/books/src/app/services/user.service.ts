import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IUser, IUsernameAvailableResponse } from '../interfaces/IUser';
import { catchError } from 'rxjs/operators';

//decorator, that declares this class as usable in other classes with dependency injection
@Injectable()
export class UserService {
    private apiUrl = 'http://localhost:3000/api';
    constructor(private http: HttpClient) {}

    //take a user object of type IUser, post it to the '/signup' - endpoint and return an Observable of type IUser
    signup(user: IUser): Observable<IUser> {
        const url = `${this.apiUrl}/auth/users/signup`;
        //send a POST request with the user object in the payload
        return this.http.post<IUser>(url, user);
    }

    //take a user object and post it to the /signin endpoint of the API, return an Observable that will emit the HTTP response from the server, which should include a user object
    login(user: IUser): Observable<HttpResponse<IUser>> {
        const url = `${this.apiUrl}/auth/users/signin`;
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.authService.refreshCurrentUser(); // Refresh the current user in AuthService

        //{ observe: 'response' } option tells HttpClient that I want the full HttpResponse not just the body, so I can access the header, which contains the authorization
        return this.http.post<IUser>(url, user, { observe: 'response' });
    }

    //take a username as string and post it to the '/username' - endpoint
    usernameAvailable(username: string) {
        const url = `${this.apiUrl}/users/username`;
        //send a POST request with the username in the payload and expect a response of type IUsernameAvailableResponse
        return this.http.post<IUsernameAvailableResponse>(url, {
            username: username,
        });
    }

    //take username and password as strings and post then to the '/sigin' - endpoint
    passwordCorrect(username: string, password: string) {
        const url = `${this.apiUrl}/auth/users/signin`;
        return this.http
            .post<IUser>(
                url,
                { username: username, password: password },
                //return the full HttpResponse.
                { observe: 'response' }
            )
            .pipe(
                //error handling with the catchError operator
                catchError(() => {
                    //throwError creates a new Observable that emits the provided error message
                    return throwError(
                        () => 'Something bad happened; please try again later.'
                    );
                })
            );
    }

    updateUser(
        currentUser: IUser | null,
        updatedUser: IUser
    ): Observable<IUser> {
        const url = `${this.apiUrl}/auth/users/update`;
        return this.http.patch<IUser>(url, {
            originalUsername: currentUser?.username,
            ...updatedUser,
        });
    }
}
