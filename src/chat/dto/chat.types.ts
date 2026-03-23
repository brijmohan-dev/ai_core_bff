
import {
    ObjectType, Field, InputType, ID, Float, Int,
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';



@ObjectType()
export class ChatSessionType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    session_type: string;

    @Field() 
    @IsString()
    status: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    title?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    presenting_issue?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    severity_detected?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    ai_summary?: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    cbt_tools_used: string[];

    @Field() 
    @IsBoolean()
    crisis_flagged: boolean;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    sentiment_score?: number;

    @Field(() => Int) 
    @IsNumber()
    message_count: number;

    @Field() 
    @IsString()
    started_at: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    ended_at?: string;
}

@ObjectType()
export class ChatMessageType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => ID) 
    @IsString()
    session_id: string;

    @Field() 
    @IsString()
    role: string;

    @Field() 
    @IsString()
    content: string;

    @Field() 
    @IsString()
    message_type: string;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    sentiment?: number;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    crisis_score?: number;

    @Field() 
    @IsString()
    created_at: string;
}

@InputType()
export class SendMessageInput {
    @Field() 
    @IsString()
    content: string;

    @Field(() => ID, { nullable: true }) 
    @IsString()
    @IsOptional()
    session_id?: string;
}

