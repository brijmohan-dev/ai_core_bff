import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';

@ObjectType()
export class ActivityType {
    @Field(() => ID) id: string;
    @Field() name: string;
    @Field() activity_type: string;
    @Field() description: string;
    @Field(() => Int) duration_minutes: number;
    @Field() difficulty: string;
    @Field(() => [String]) tags: string[];
    @Field({ nullable: true }) audio_url?: string;
    @Field({ nullable: true }) thumbnail_url?: string;
}

@ObjectType()
export class ActivitySessionType {
    @Field(() => ID) id: string;
    @Field() activity_type: string;
    @Field() activity_name: string;
    @Field(() => Int) duration_seconds: number;
    @Field() completed: boolean;
    @Field(() => Int, { nullable: true }) mood_before?: number;
    @Field(() => Int, { nullable: true }) mood_after?: number;
    @Field({ nullable: true }) notes?: string;
    @Field() started_at: string;
}

@ObjectType()
export class ActivityStreakType {
    @Field(() => Int) streak_days: number;
    @Field(() => Int) total_completed: number;
}

@InputType()
export class LogActivityInput {
    @Field() activity_type: string;
    @Field() activity_name: string;
    @Field(() => Int) duration_seconds: number;
    @Field({ defaultValue: false }) completed: boolean;
    @Field(() => Int, { nullable: true }) mood_before?: number;
    @Field(() => Int, { nullable: true }) mood_after?: number;
    @Field({ nullable: true }) notes?: string;
}