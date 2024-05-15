import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly password : string;

}