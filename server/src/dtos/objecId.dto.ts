import { buildMessage, IsNotEmpty, IsString, Matches } from "class-validator";


export class IdDto {
    @IsString()
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
        message: 'not objectId',
    })
    public id: string
}