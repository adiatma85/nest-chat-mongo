import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatQueryDto, CreateGroupChatDto } from './dto/chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';

@Controller('v1/chat')
@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(TokenGuard)
export class ChatController {

    constructor(
        private readonly chatService: ChatService,
    ) {

    }

    @Post()
    public async accessChat(@Req() request: Request, @Body() body: ChatQueryDto) {
        const { userId } = body
        try {
            const data = await this.chatService.accessChat(request, userId)
            return data
        } catch (error) {
            throw error
        }
    }

    @Get()
    public async fetchChats() {

    }

    @Post('/group')
    @HttpCode(HttpStatus.OK)
    public async createGroupChat(@Req() request: Request, @Body() body: CreateGroupChatDto) {
        try {

            // Dicek dulu di sini apa ada dua atau gk

            const data = await this.chatService.createGroupChat(request, body)
            return data
        } catch (error) {
            throw error
        }
    }

    @Put('/rename')
    public async renameGroup() {

    }

    @Put('/group-add')
    public async addToGroup() {

    }


    @Put('/group-remove')
    public async removeFromGroup() {

    }

}
