import {
    ObjectType, Field, InputType, ID, Float, Int
} from '@nestjs/graphql';


@ObjectType()
export class MoodLogType {
    @Field(() => ID) id: string;
    @Field(() => Int) mood_score: number;
    @Field({ nullable: true }) mood_emoji?: string;
    @Field(() => Int, { nullable: true }) energy_level?: number;
    @Field(() => Int, { nullable: true }) anxiety_level?: number;
    @Field(() => [String]) context_tags: string[];
    @Field({ nullable: true }) note?: string;
    @Field() logged_at: string;
}

@ObjectType()
export class MoodTrendType {
    @Field() date: string;
    @Field(() => Float) avg_score: number;
    @Field(() => Int) count: number;
}

@InputType()
export class LogMoodInput {
    @Field(() => Int) mood_score: number;
    @Field({ nullable: true }) mood_emoji?: string;
    @Field(() => Int, { nullable: true }) energy_level?: number;
    @Field(() => Int, { nullable: true }) anxiety_level?: number;
    @Field(() => [String], { defaultValue: [] }) context_tags: string[];
    @Field({ nullable: true }) note?: string;
}
