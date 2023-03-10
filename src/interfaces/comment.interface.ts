import { User } from "./users.interface";

export interface Comment {
    _id: string;
    userId: string;
    postId: string;
    content: string;
    status: boolean;
    votes: number;
    user: User;
}