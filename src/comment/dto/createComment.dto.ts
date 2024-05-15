import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly content : string
    @ApiProperty()
    @IsNotEmpty()
    readonly postId : number
}