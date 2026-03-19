import {
    Resolver, Query, Mutation, Args,
    Subscription
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SOSEventType, TriggerSOSInput } from '@/sos/dto/sos.types';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { MessageResult } from '@/common/types/common.types';
import { SosService } from '@/sos/sos.service';

const pubSub = new PubSub();

@Resolver(() => SOSEventType)
export class SosResolver {
    constructor(private readonly sos: SosService) {}

    @Mutation(() => SOSEventType, { description: 'Trigger SOS — notifies all emergency contacts immediately' })
    @UseGuards(JwtAuthGuard)
    async triggerSOS(
        @AuthToken() token: string, 
        @Args('input') input: TriggerSOSInput
    ): Promise<SOSEventType> {
        const result = await this.sos.triggerSOS(token, input) as SOSEventType;
        pubSub.publish('SOS_TRIGGERED', { sosTriggered: result });
        return result;
    }

    @Query(() => [SOSEventType])
    @UseGuards(JwtAuthGuard)
    async sosHistory(
        @AuthToken() token: string
    ): Promise<SOSEventType[]> {
        return this.sos.sosHistory(token) as Promise<SOSEventType[]>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async resolveSOS(
        @AuthToken() token: string, 
        @Args('sosId') sosId: string
    ): Promise<MessageResult> {
        return this.sos.resolveSOS(token, sosId) as Promise<MessageResult>;
    }

    @Subscription(() => SOSEventType)
    sosTriggered() {
        return pubSub.asyncIterator('SOS_TRIGGERED');
    }
}

