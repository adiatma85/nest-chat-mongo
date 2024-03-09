import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user..schema';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport"
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers : [UserService, AuthService],
})
export class AuthModule {}
