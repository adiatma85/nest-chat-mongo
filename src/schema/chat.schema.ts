import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

const schemaOpt: SchemaOptions = {
    timestamps: true
}

@Schema(schemaOpt)
export class Chat {
    @Prop({ required: true })
    chatName: string;

    @Prop({ required: true })
    isGroupChat: boolean;

    @Prop({ required: true, type: [String]})
    users: string[];

    @Prop({ required: true })
    latestMessage: string;

    @Prop({ required: true })
    groupAdmin: string;
}

export type ChatDocument = HydratedDocument<Chat>;

export const ChatSchema = SchemaFactory.createForClass(Chat);
