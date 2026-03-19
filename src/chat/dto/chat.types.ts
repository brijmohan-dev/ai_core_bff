
import {
    ObjectType, Field, InputType, ID, Float, Int,
} from '@nestjs/graphql';



@ObjectType()
export class ChatSessionType {
    @Field(() => ID) id: string;
    @Field() session_type: string;
    @Field() status: string;
    @Field({ nullable: true }) title?: string;
    @Field({ nullable: true }) presenting_issue?: string;
    @Field({ nullable: true }) severity_detected?: string;
    @Field({ nullable: true }) ai_summary?: string;
    @Field(() => [String]) cbt_tools_used: string[];
    @Field() crisis_flagged: boolean;
    @Field(() => Float, { nullable: true }) sentiment_score?: number;
    @Field(() => Int) message_count: number;
    @Field() started_at: string;
    @Field({ nullable: true }) ended_at?: string;
}

@ObjectType()
export class ChatMessageType {
    @Field(() => ID) id: string;
    @Field(() => ID) session_id: string;
    @Field() role: string;
    @Field() content: string;
    @Field() message_type: string;
    @Field(() => Float, { nullable: true }) sentiment?: number;
    @Field(() => Float, { nullable: true }) crisis_score?: number;
    @Field() created_at: string;
}

@InputType()
export class SendMessageInput {
    @Field() content: string;
    @Field(() => ID, { nullable: true }) session_id?: string;
}

