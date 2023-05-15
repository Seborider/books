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
}

export interface IUsernameAvailableResponse {
    available?: boolean;
    exists: boolean;
}
