import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ChatQueryDto {   
    userId : string
}

export class CreateGroupChatDto {
    users: any

    name: string
}