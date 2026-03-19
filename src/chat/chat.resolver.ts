import {
    Int, Resolver, Query, 
    Mutation, Args,Subscription
} from '@nestjs/graphql';
import { ChatSessionType, ChatMessageType, SendMessageInput } from '@/chat/dto/chat.types';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { ChatService } from '@/chat/chat.service';

const pubSub = new PubSub();

@Resolver(() => ChatSessionType)
export class ChatResolver {
    constructor(private readonly chat: ChatService) {}

    @Query(() => [ChatSessionType])
    @UseGuards(JwtAuthGuard)
    async myChatSessions(
        @AuthToken() token: string,
        @Args('status', { nullable: true }) status?: string,
        @Args('limit', { type: () => Int, defaultValue: 20 }) limit?: number,
    ): Promise<ChatSessionType[]> {
        return this.chat.listChatSessions(token, { status, limit }) as Promise<ChatSessionType[]>;
    }

    @Query(() => ChatSessionType)
    @UseGuards(JwtAuthGuard)
    async chatSession(
        @AuthToken() token: string,
        @Args('id') id: string
    ): Promise<ChatSessionType> {
        return this.chat.getChatSession(token, id) as Promise<ChatSessionType>;
    }

    @Query(() => [ChatMessageType])
    @UseGuards(JwtAuthGuard)
    async chatMessages(
        @AuthToken() token: string,
        @Args('sessionId') sessionId: string
    ): Promise<ChatMessageType[]> {
        return this.chat.getChatMessages(token, sessionId) as Promise<ChatMessageType[]>;
    }

    @Mutation(() => ChatMessageType, { description: 'Send a message to the AI — creates a session if none provided' })
    @UseGuards(JwtAuthGuard)
    async sendChatMessage(
        @AuthToken() token: string,
        @Args('input') input: SendMessageInput
    ): Promise<ChatMessageType> {
        const result = await this.chat.sendMessage(token, input) as ChatMessageType;
        // Publish for subscription
        pubSub.publish('MESSAGE_ADDED', { chatMessageAdded: result, sessionId: input.session_id || result.session_id });
        return result;
    }

    @Mutation(() => ChatSessionType)
    @UseGuards(JwtAuthGuard)
    async endChatSession(
        @AuthToken() token: string,
        @Args('sessionId') sessionId: string
    ): Promise<ChatSessionType> {
        return this.chat.endChatSession(token, sessionId) as Promise<ChatSessionType>;
    }

    @Mutation(() => ChatSessionType)
    @UseGuards(JwtAuthGuard)
    async createChatSession(
        @AuthToken() token: string,
        @Args('sessionType', { defaultValue: 'ai' }) sessionType: string,
    ): Promise<ChatSessionType> {
        return this.chat.createChatSession(token, { session_type: sessionType }) as Promise<ChatSessionType>;
    }

    @Subscription(() => ChatMessageType, {
        filter: (payload, variables) => payload.sessionId === variables.sessionId,
    })
    chatMessageAdded(
        @Args('sessionId') _sessionId: string
    ) {
        return pubSub.asyncIterator('MESSAGE_ADDED');
    }
}