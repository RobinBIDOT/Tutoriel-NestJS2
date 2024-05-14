import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly body?: string;
}
