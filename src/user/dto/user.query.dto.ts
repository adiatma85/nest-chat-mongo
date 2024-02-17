import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Need to filtering name and email attribute on model schema mongodb
export class UserQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}

// DTO class for Creating User
export class UserCreateDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    pic?: string;
}

// DTO Class for Login User
export class UserLoginDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}