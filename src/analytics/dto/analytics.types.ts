import {
    ObjectType, Field, ID, Float, Int
} from '@nestjs/graphql';
import { MoodTrendType } from '@/mood/dto/mood.types';
import { ChatSessionType } from '@/chat/dto/chat.types';
import { IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';

@ObjectType()
export class WellnessReportType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    report_type: string;

    @Field() 
    @IsString()
    period_start: string;

    @Field() 
    @IsString()
    period_end: string;

    @Field(() => Float, { nullable: true }) 
    @IsOptional()
    @IsNumber()
    wellness_score?: number;

    @Field(() => Float, { nullable: true }) 
    @IsOptional()
    @IsNumber()
    avg_mood_score?: number;

    @Field(() => Int) 
    @IsNumber()
    journal_entries: number;

    @Field(() => Int) 
    @IsNumber()
    activities_completed: number;

    @Field(() => Int) 
    @IsNumber()
    chat_sessions_count: number;

    @Field(() => Int) 
    @IsNumber()
    sos_events_count: number;

    @Field() 
    @IsString()
    generated_at: string;
}

@ObjectType()
export class DashboardStatsType {
    @Field(() => Float) 
    @IsNumber()
    wellness_score: number;

    @Field(() => Float) 
    @IsNumber()
    avg_mood_score: number;

    @Field(() => Int) 
    @IsNumber()
    journal_streak: number;

    @Field(() => Int) 
    @IsNumber()
    total_sessions: number;

    @Field(() => Int)
    @IsNumber()
    activities_this_week: number;

    @Field(() => [MoodTrendType])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MoodTrendType)
    mood_trend: MoodTrendType[];

    @Field(() => [ChatSessionType])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ChatSessionType)
    recent_chat_sessions: ChatSessionType[];
}
