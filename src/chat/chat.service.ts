import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'src/schema/chat.schema';
import { User } from 'src/schema/user..schema';

@Injectable()
export class ChatService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    ) {

    }

    public async accessChat(userId: string) {
        var isChat = await this.chatModel.find({
            isGroupChat: false,
            $and: [
            //   { users: { $elemMatch: { $eq: req.user._id } } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users", "-password")
            .populate("latestMessage");
    }
}
