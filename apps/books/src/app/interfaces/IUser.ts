export interface IUser {
    token: string;
    expires_at: string;
    user: IUser | null;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    currentUsername: string;
    books: IBook[];
}

export interface IUsernameAvailableResponse {
    available?: boolean;
    exists: boolean;
}

interface IBook {
    title: string;
    author: string;
    genre: string;
    id: string;
}
