export interface Bookmark {
    _id: string;
    userId: string;
    postId: string;
}

export interface BookmarkWithUser {
    _id: string;
    userId: {
        _id: string;
        email: string;
        display_name: string;
        avatar?: string;
        bio?: string;
        about?: string;
    };
    postId: string;
    created_at: string;
    updated_at: string;
}