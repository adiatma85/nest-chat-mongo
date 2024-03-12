import { HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContextKey } from 'src/common/context-key';
import { ErrorDTO } from 'src/common/response.dto';
import { Chat } from 'src/schema/chat.schema';
import { User } from 'src/schema/user..schema';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {
  }

  public async accessChat(@Req() request: Request, userId: string) {
    const user = request[ContextKey.User]

    var isChat = await this.chatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    let isChat1 = await this.userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat1.length > 0) {
      return isChat1[0];
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [user._id, userId],
      };

      try {
        const createdChat = await this.chatModel.create(chatData);
        const FullChat = await this.chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        return FullChat;
        // res.status(200).json(FullChat);
      } catch (error) {
        throw new ErrorDTO(HttpStatus.BAD_REQUEST, error.message)
      }
    }
  }

  public async fetchChats(@Req() request: Request) {
    try {
      const user = request[ContextKey.User]

      const chatResults = await this.chatModel.find({ users: { $elemMatch: { $eq: user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

      const finalResults = await this.userModel.populate(chatResults, {
        path: "latestMessage.sender",
        select: "name pic email",
      });

      return finalResults
    } catch (error) {
      throw new ErrorDTO(HttpStatus.BAD_REQUEST, error.message)
    }
  }

  public async createGroupChat(@Req() request: Request) {
  //   if (!req.body.users || !req.body.name) {
  //     return res.status(400).send({ message: "Please Fill all the feilds" });
  //   }
  
  //   var users = JSON.parse(req.body.users);
  
  //   if (users.length < 2) {
  //     return res
  //       .status(400)
  //       .send("More than 2 users are required to form a group chat");
  //   }
  
  //   users.push(req.user);
  
  //   try {
  //     const groupChat = await Chat.create({
  //       chatName: req.body.name,
  //       users: users,
  //       isGroupChat: true,
  //       groupAdmin: req.user,
  //     });
  
  //     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
  //       .populate("users", "-password")
  //       .populate("groupAdmin", "-password");
  
  //     res.status(200).json(fullGroupChat);
  //   } catch (error) {
  //     res.status(400);
  //     throw new Error(error.message);
  //   }
  }
}
