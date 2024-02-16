import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

const schemaOpt: SchemaOptions = {
    timestamps: true
}

@Schema(schemaOpt)
export class Message {
    @Prop({ required: true })
    sender: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    chat: string;

    @Prop({ required: true, type: [String]})
    readBy: string[];
}

export type MessageDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);
