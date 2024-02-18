import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('v1/chat')
export class ChatController {

    @Post()
    public async accessChat() {
        // return this.chatService.create(createChatDto);
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
