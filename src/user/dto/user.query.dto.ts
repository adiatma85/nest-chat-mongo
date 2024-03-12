import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

// Need to filtering name and email attribute on model schema mongodb
export class UserQueryDto {
    @IsString()
    @IsOptional()
    _id?: string;
    
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    constructor(init?: Partial<UserQueryDto>) {
        Object.assign(this, init);
    }
}

export class UserQueryInterface {
    @IsString()
    @IsOptional()
    _id?: string;
    
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

    constructor(init?: Partial<UserCreateDto>) {
        Object.assign(this, init);
    }
}

export class UserCreateInterface {
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

    constructor(init?: Partial<UserCreateInterface>) {
        Object.assign(this, init);
    }
}

// DTO Class for Login User
export class UserLoginDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    constructor(init?: Partial<UserLoginDto>) {
        Object.assign(this, init);
    }
}

export class UserLoginInterface {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    constructor(init?: Partial<UserLoginDto>) {
        Object.assign(this, init);
    }
}

export class UserUpdateDto extends PartialType(UserCreateDto) {
    @IsString()
    @IsOptional()
    id?: string;
}

export class UserUpdateInterface extends PartialType(UserCreateInterface) {
    @IsString()
    @IsOptional()
    id?: string;
}

export class UserDeleteDto extends PartialType(UserCreateDto) {
    @IsString()
    @IsOptional()
    _id?: string;
}

export class UserDeleteInterface extends PartialType(UserCreateInterface) {
    @IsString()
    @IsOptional()
    _id?: string;
}