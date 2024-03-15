export class RegisterResponse {

    constructor(user: any){
        this.user = user
    }

    user: any
}

export class LoginResponse {
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
    
    // Accesstoken
    accessToken: string
}
