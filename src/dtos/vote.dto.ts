import { IsEmpty, IsEnum, IsString, Matches } from "class-validator";

export class VotePostDto {
    @IsEmpty()
    public userId: string
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public postId: string
    @IsString()
    @IsEnum(['Upvote', 'Downvote'])
    public type: string
}


export class DeleteVotePostDto {
    @IsEmpty()
    public userId: string
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public postId: string
}


export class VoteCommentDto {
    @IsEmpty()
    public userId: string
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public commentId: string
    @IsString()
    @IsEnum(['Upvote', 'Downvote'])
    public type: string
}


export class DeleteVoteCommentDto {
    @IsEmpty()
    public userId: string
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public commentId: string
}
