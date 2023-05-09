import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUsernameAvailableResponse } from '../interfaces/IUser';

//decorator, that declares this class as usable in other classes with dependency injection
@Injectable()
export class UserService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    //take a user object of type IUser, post it to the '/signup' - endpoint and return an Observable of type IUser
    signup(user: IUser): Observable<IUser> {
        const url = `${this.apiUrl}/users/signup`;
        //send a POST request with the user object in the payload
        return this.http.post<IUser>(url, user);
    }

    //take a username as string and post it to the '/username' - endpoint
    usernameAvailable(username: string) {
        const url = `${this.apiUrl}/users/username`;
        //send a POST request with the username in the payload and expect a response of type IUsernameAvailableResponse
        return this.http.post<IUsernameAvailableResponse>(url, {
            username: username,
        });
    }
}
