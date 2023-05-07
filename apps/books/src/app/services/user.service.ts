import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, usernameAvailabeResponse } from '../types/user';

@Injectable()
export class UserService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    signup(user: User): Observable<User> {
        const url = `${this.apiUrl}/users/signup`;
        return this.http.post<User>(url, user);
    }

    usernameAvailabe(username: string) {
        const url = `${this.apiUrl}/users/username`;
        return this.http.post<usernameAvailabeResponse>(url, {
            username: username,
        });
    }
}
