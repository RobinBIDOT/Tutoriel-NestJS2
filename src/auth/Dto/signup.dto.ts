import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignupDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly username : string
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email : string
    @ApiProperty()
    @IsNotEmpty()
    readonly password : string
}