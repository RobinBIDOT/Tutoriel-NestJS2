import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ResetPasswordDemandDto {
    @ApiProperty()
    @IsEmail()
    readonly email : string

}