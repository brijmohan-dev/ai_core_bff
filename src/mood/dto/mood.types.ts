import {
    ObjectType, Field, InputType, ID, Float, Int
} from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';


@ObjectType()
export class MoodLogType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => Int) 
    @IsNumber()
    mood_score: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    mood_emoji?: string;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    energy_level?: number;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    anxiety_level?: number;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    context_tags: string[];

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    note?: string;

    @Field() 
    @IsString()
    logged_at: string;
}

@ObjectType()
export class MoodTrendType {
    @Field() 
    @IsString()
    date: string;

    @Field(() => Float) 
    @IsNumber()
    avg_score: number;

    @Field(() => Int) 
    @IsNumber()
    count: number;
}

@InputType()
export class LogMoodInput {
    @Field(() => Int) 
    @IsNumber()
    mood_score: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    mood_emoji?: string;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    energy_level?: number;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    anxiety_level?: number;

    @Field(() => [String], { defaultValue: [] }) 
    @IsArray()
    @IsString({ each: true })
    context_tags: string[];

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    note?: string;
}
