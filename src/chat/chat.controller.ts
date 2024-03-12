import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatQueryDto } from './dto/chat.dto';

@Controller('v1/chat')
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
    public async createGroupChat() {
        // return this.chatService.create(createChatDto);
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
