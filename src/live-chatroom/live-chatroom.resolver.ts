import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/user/user..types';
import { LiveChatroomService } from './live-chatroom.service';
import { UserService } from 'src/user/user.service';
import { Subscription, Args, Context, Mutation } from '@nestjs/graphql';
import { Request } from 'express';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';

@Resolver()
export class LiveChatroomResolver {
  private pubSub: PubSub;
  constructor(
    private readonly liveChatroomService: LiveChatroomService,
    private readonly userService: UserService,
  ) {
    this.pubSub = new PubSub();
  }

  
}
