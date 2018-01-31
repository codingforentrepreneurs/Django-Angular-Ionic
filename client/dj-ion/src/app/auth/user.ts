export class User {
    token?: string;
    user?: string;
    expires?: string; // convert to timestamp
    id?: number;
    username?: string;
    uri?: string;

    public getUsername(){
        return this.username || this.user || "unknown"
    }
}

