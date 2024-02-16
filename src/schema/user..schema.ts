import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import * as bcrypt from "bcryptjs";

const schemaOpt: SchemaOptions = {
    timestamps: true
}

@Schema(schemaOpt)
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" })
    pic: string;

    @Prop({ required: true, default: false })
    isAdmin: boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

// Matching the password methods
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Salting the password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});