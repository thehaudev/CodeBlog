export interface Comment {
    userId: string;
    postId: string;
    content: string;
    status: boolean;
    votes: number;
}