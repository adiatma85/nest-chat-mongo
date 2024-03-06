export class LoginResponse {
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
    
    accessToken: string
}
