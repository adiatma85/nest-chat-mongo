import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRootAsync({
      imports: [
        ConfigModule,
        // I don't fucking know why this is returned error
        AppModule
      ],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService,

        // tokenService: TokenService,
      ) => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          // installSubscriptionHandlers: true,
          // subscriptions: {
          //   'graphql-ws': true,
          //   'subscriptions-transport-ws': true,
          // },
          // onConnect: (connectionParams) => {
          //   const token = tokenService.extractToken(connectionParams);

          //   if (!token) {
          //     throw new Error('Token not provided');
          //   }
          //   const user = tokenService.validateToken(token);
          //   if (!user) {
          //     throw new Error('Invalid token');
          //   }
          //   return { user };
          // },
          // context: ({ req, res, connection }) => {
          //   if (connection) {
          //     return { req, res, user: connection.context.user, pubSub }; // Injecting pubSub into context
          //   }
          //   return { req, res };
          // },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
