import { User } from '../auth/user';

export class Status {
    uri: string;
    id: number;
    user: User;
    content?: string;
    image?: string;
}
