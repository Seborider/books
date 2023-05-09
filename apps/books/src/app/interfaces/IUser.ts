export interface IUser {
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
