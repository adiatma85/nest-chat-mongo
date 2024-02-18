import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {

    public async accessChat() {
        return [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'I am fine, thank you' },
        ];
    }
}
