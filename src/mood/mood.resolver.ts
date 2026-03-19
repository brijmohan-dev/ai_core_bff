import {
    Int, Resolver, Query, 
    Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { MoodLogType, MoodTrendType, LogMoodInput } from '@/mood/dto/mood.types'
import { MoodService } from '@/mood/mood.service';

@Resolver(() => MoodLogType)
export class MoodResolver {
    constructor(private readonly mood: MoodService) {}

    @Query(() => [MoodLogType])
    @UseGuards(JwtAuthGuard)
    async myMoods(
        @AuthToken() token: string, 
        @Args('days', { type: () => Int, defaultValue: 30 }) days: number
    ): Promise<MoodLogType[]> {
        return this.mood.listMoods(token, { days }) as Promise<MoodLogType[]>;
    }

    @Query(() => [MoodTrendType])
    @UseGuards(JwtAuthGuard)
    async moodTrends(
        @AuthToken() token: string, 
        @Args('days', { type: () => Int, defaultValue: 14 }) days: number
    ): Promise<MoodTrendType[]> {
        return this.mood.getMoodTrends(token, { days }) as Promise<MoodTrendType[]>;
    }

    @Mutation(() => MoodLogType)
    @UseGuards(JwtAuthGuard)
    async logMood(
        @AuthToken() token: string, 
        @Args('input') input: LogMoodInput
    ): Promise<MoodLogType> {
        return this.mood.logMood(token, input) as Promise<MoodLogType>;
    }
}
