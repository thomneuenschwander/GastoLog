export class Credentials {
   email?: string
   password?: string

   constructor(email?: string, password?: string) {
      this.email = email
      this.password = password
   }
}

export class RegisterData extends Credentials {
   name?: string
   confirmPassword?: string

   constructor(
      email?: string,
      password?: string,
      name?: string,
      confirmPassword?: string
   ) {
      super(email, password)
      this.name = name
      this.confirmPassword = confirmPassword
   }
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
