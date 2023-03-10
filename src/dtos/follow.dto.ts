import { IsEmpty, IsString, Matches } from "class-validator"


export class FollowTagDto {
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    tagId: string

    @IsEmpty()
    follower: string
}

export class FollowUserDto {
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    userId: string

    @IsEmpty()
    follower: string
}