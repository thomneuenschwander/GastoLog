export class Credentials {
    email?: string;
    password?: string;
}

export class Register extends Credentials{
    name?: string;
    confirmPassword?: string
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    email?: string;
    accessToken?: string;
    expiration?: number;
}
