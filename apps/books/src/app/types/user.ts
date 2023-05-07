export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface usernameAvailabeResponse {
    available?: boolean;
    exists: boolean;
}
