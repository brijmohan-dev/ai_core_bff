import {
    ObjectType, Field, ID, Float, Int
} from '@nestjs/graphql';
import { MoodTrendType } from '@/mood/dto/mood.types';
import { ChatSessionType } from '@/chat/dto/chat.types';

@ObjectType()
export class WellnessReportType {
    @Field(() => ID) id: string;
    @Field() report_type: string;
    @Field() period_start: string;
    @Field() period_end: string;
    @Field(() => Float, { nullable: true }) wellness_score?: number;
    @Field(() => Float, { nullable: true }) avg_mood_score?: number;
    @Field(() => Int) journal_entries: number;
    @Field(() => Int) activities_completed: number;
    @Field(() => Int) chat_sessions_count: number;
    @Field(() => Int) sos_events_count: number;
    @Field() generated_at: string;
}

@ObjectType()
export class DashboardStatsType {
    @Field(() => Float) wellness_score: number;
    @Field(() => Float) avg_mood_score: number;
    @Field(() => Int) journal_streak: number;
    @Field(() => Int) total_sessions: number;
    @Field(() => Int) activities_this_week: number;
    @Field(() => [MoodTrendType]) mood_trend: MoodTrendType[];
    @Field(() => [ChatSessionType]) recent_chat_sessions: ChatSessionType[];
}
