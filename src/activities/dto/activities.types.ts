import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';
import { IsNumber, IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';

@ObjectType()
export class ActivityType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    name: string;

    @Field() 
    @IsString()
    activity_type: string;

    @Field() 
    @IsString()
    description: string;

    @Field(() => Int) 
    @IsNumber()
    duration_minutes: number;

    @Field() 
    @IsString()
    difficulty: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @Field({ nullable: true }) 
    @IsOptional()
    @IsString()
    audio_url?: string;

    @Field({ nullable: true }) 
    @IsOptional()
    @IsString()
    thumbnail_url?: string;
}

@ObjectType()
export class ActivitySessionType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    activity_type: string;

    @Field() 
    @IsString()
    activity_name: string;

    @Field(() => Int) 
    @IsNumber()
    duration_seconds: number;

    @Field() 
    @IsBoolean()
    completed: boolean;

    @Field(() => Int, { nullable: true }) 
    @IsOptional()
    @IsNumber()
    mood_before?: number;

    @Field(() => Int, { nullable: true }) 
    @IsOptional()
    @IsNumber()
    mood_after?: number;

    @Field({ nullable: true }) 
    @IsOptional()
    @IsString()
    notes?: string;

    @Field() 
    @IsString()
    started_at: string;
}

@ObjectType()
export class ActivityStreakType {
    @Field(() => Int) 
    @IsNumber()
    streak_days: number;

    @Field(() => Int) 
    @IsNumber()
    total_completed: number;
}

@InputType()
export class LogActivityInput {
    @Field() 
    @IsString()
    activity_type: string;

    @Field() 
    @IsString()
    activity_name: string;

    @Field(() => Int) 
    @IsNumber()
    duration_seconds: number;

    @Field({ defaultValue: false }) 
    @IsBoolean()
    @IsOptional()
    completed: boolean;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_before?: number;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_after?: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    notes?: string;
}