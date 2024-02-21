import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { AddContextAttribute } from './middleware/context';


// Environment variables
let jwtSecret : string
let mongoDBUri : string

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: mongoDBUri,
      }),
      inject: [ConfigService],

    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret || "secret",
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UserModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  
  // Constructor to assign environment variables
  constructor() {
    jwtSecret = process.env.JWT_SECRET
    mongoDBUri = process.env.MONGODB_URI
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddContextAttribute)
      .forRoutes('*');
  }
}
