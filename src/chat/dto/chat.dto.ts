import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsObject } from 'class-validator';
import { User } from 'src/schema/user..schema';

export class ChatQueryDto {   
    userId : string
}

export class CreateGroupChatDto {
    @IsObject()
    @ApiProperty({ type: () => [User], required: true })
    users: User[];

    @IsString()
    @ApiProperty({ required: true }) 
    name: string;
}