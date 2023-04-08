import { Bookmark } from "./ bookmarks.interface";
import { Follow_Tag } from "./follow_tag.interface";
import { Follow_User } from "./follow_user.interface";
import { Post } from "./posts.interface";

export interface User {
    _id: string;
    email: string;
    password?: string;
    role: number
    display_name: string;
    bio: string;
    avatar: string;
    location: string;
    about: string;
    posts:Post[]
    followingUser: Follow_User[]
    followingTag:Follow_Tag[]
    bookmarks:Bookmark[]
    created_at: string;
    updated_at: string;
}
export interface UserWithoutPassword{
    _id: string;
    email: string;
    role: number
    display_name: string;
    bio: string;
    avatar: string;
    location: string;
    about: string;
    posts:Post[]
    followingUser: Follow_User[]
    followingTag:Follow_Tag[]
    bookmarks:Bookmark[]
    created_at: string;
    updated_at: string;
}