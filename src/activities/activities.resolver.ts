import {
    Resolver, Query, Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { 
    ActivityType, ActivitySessionType, 
    ActivityStreakType, LogActivityInput 
} from '@/activities/dto/activities.types';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { ActivitiesService } from '@/activities/activities.service';

@Resolver(() => ActivityType)
export class ActivitiesResolver {
    constructor(private readonly activity: ActivitiesService) {}

    @Query(() => [ActivityType])
    async activities(
        @Args('tag', { nullable: true }) tag?: string
    ): Promise<ActivityType[]> {
        return this.activity.listActivities({ tag }) as Promise<ActivityType[]>;
    }

    @Query(() => [ActivitySessionType])
    @UseGuards(JwtAuthGuard)
    async myActivitySessions(
        @AuthToken() token: string
    ): Promise<ActivitySessionType[]> {
        return this.activity.listActivitySessions(token) as Promise<ActivitySessionType[]>;
    }

    @Query(() => ActivityStreakType)
    @UseGuards(JwtAuthGuard)
    async myActivityStreak(
        @AuthToken() token: string
    ): Promise<ActivityStreakType> {
        return this.activity.getActivityStreak(token) as Promise<ActivityStreakType>;
    }

    @Mutation(() => ActivitySessionType)
    @UseGuards(JwtAuthGuard)
    async logActivity(
        @AuthToken() token: string, 
        @Args('input') input: LogActivityInput
    ): Promise<ActivitySessionType> {
        return this.activity.logActivitySession(token, input) as Promise<ActivitySessionType>;
    }
}

