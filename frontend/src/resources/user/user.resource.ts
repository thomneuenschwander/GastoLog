export class Credentials {
   email?: string
   password?: string
}

export class RegisterData extends Credentials {
   name?: string
   confirmPassword?: string
}

export class AccessToken {
   accessToken?: string
}

export class UserSessionToken {
   name?: string
   email?: string
   accessToken?: string
   expiration?: number
}
