import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly body: string;
}
