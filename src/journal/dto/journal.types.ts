import {
  ObjectType, Field, InputType, ID, Float
} from '@nestjs/graphql';

@ObjectType()
export class JournalEntryType {
    @Field(() => ID) id: string;
    @Field({ nullable: true }) title?: string;
    @Field() content: string;
    @Field(() => [String]) emotion_tags: string[];
    @Field({ nullable: true }) prompt_used?: string;
    @Field(() => Float, { nullable: true }) sentiment_score?: number;
    @Field(() => [String]) photo_urls: string[];
    @Field() is_shared_with_therapist: boolean;
    @Field() entry_date: string;
    @Field() created_at: string;
    @Field() updated_at: string;
}

@InputType()
export class CreateJournalInput {
    @Field({ nullable: true }) title?: string;
    @Field() content: string;
    @Field(() => [String], { defaultValue: [] }) emotion_tags: string[];
    @Field({ nullable: true }) entry_date?: string;
    @Field({ defaultValue: false }) is_shared_with_therapist: boolean;
}

@InputType()
export class UpdateJournalInput {
    @Field({ nullable: true }) title?: string;
    @Field({ nullable: true }) content?: string;
    @Field(() => [String], { nullable: true }) emotion_tags?: string[];
    @Field({ nullable: true }) is_shared_with_therapist?: boolean;
}

@ObjectType()
export class DailyPromptType {
    @Field() prompt: string;
    @Field() date: string;
}
