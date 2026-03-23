import {
  ObjectType, Field, InputType, ID, Float
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class JournalEntryType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    title?: string;

    @Field() 
    @IsString()
    content: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    emotion_tags: string[];

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    prompt_used?: string;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    sentiment_score?: number;

    @Field(() => [String]) 
    @IsString()
    photo_urls: string[];

    @Field() 
    @IsBoolean()
    is_shared_with_therapist: boolean;

    @Field() 
    @IsString()
    entry_date: string;

    @Field() 
    @IsString()
    created_at: string;

    @Field() 
    @IsString()
    updated_at: string;
}

@InputType()
export class CreateJournalInput {
    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    title?: string;

    @Field() 
    @IsString()
    content: string;

    @Field(() => [String], { defaultValue: [] }) 
    @IsArray()
    @IsString({ each: true })
    emotion_tags: string[];

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    entry_date?: string;

    @Field({ defaultValue: false }) 
    @IsBoolean()
    @IsOptional()
    is_shared_with_therapist: boolean;
}

@InputType()
export class UpdateJournalInput {
    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    title?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    content?: string;

    @Field(() => [String], { nullable: true }) 
    @IsArray()
    @IsString({ each: true })
    emotion_tags?: string[];

    @Field({ nullable: true }) 
    @IsBoolean()
    @IsOptional()
    is_shared_with_therapist?: boolean;
}

@ObjectType()
export class DailyPromptType {
    @Field() 
    @IsString()
    prompt: string;

    @Field() 
    @IsString()
    date: string;
}
