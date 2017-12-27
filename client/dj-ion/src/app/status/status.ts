export class Status {
    uri: string;
    id: number;
    user: {
        id: number;
        username: string;
        uri: string;
    };
    content?: string;
    image?: string;
}
