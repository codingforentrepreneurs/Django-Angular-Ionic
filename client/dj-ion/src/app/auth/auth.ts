export class AuthLoginData {
    username: string; // sending to our API
    password: string;

    constructor(un:string, pass: string){
        this.username = un;
        this.password = pass;
    }
}