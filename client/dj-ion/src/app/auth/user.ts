export class User {
    id: number;
    username: string;
    displayName: string;
    uri: string;
    token?: string;
    expires?: string; // convert to timestamp
}

