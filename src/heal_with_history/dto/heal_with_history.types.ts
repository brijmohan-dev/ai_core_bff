import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class HistoryFigureType {
    @Field() 
    @IsString()
    slug: string;

    @Field() 
    @IsString()
    name: string;

    @Field() 
    @IsString()
    era: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    era_label?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    period?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    origin?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    tagline?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    image_emoji?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    primary_theme?: string;

    @Field(() => Int) 
    @IsNumber()
    @IsOptional()
    sort_order: number;

    @Field() 
    @IsBoolean()
    generated: boolean;
}

@ObjectType()
export class HistoryStoryCardType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    figure_slug: string;

    @Field() 
    @IsString()
    figure_name: string;

    @Field() 
    @IsString()
    figure_era: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_era_label?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_period?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_origin?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_tagline?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_emoji?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    figure_primary_theme?: string;

    @Field() 
    @IsString()
    title: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    subtitle?: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    emotional_themes: string[];

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    mood_tags: string[];

    @Field(() => Int) 
    @IsNumber()
    reading_minutes: number;

    @Field()
    @IsBoolean() 
    is_featured: boolean;

    @Field(() => Int) 
    @IsNumber()
    view_count: number;

    @Field(() => Int) 
    @IsNumber()
    sort_order: number;

    @Field() 
    @IsString()
    generated_at: string;
}

@ObjectType()
export class HistoryStoryFullType extends HistoryStoryCardType {
    @Field() 
    @IsString()
    the_story: string;

    @Field() 
    @IsString()
    the_parallel: string;

    @Field() 
    @IsString()
    reflection_prompt: string;

    @Field() 
    @IsString()
    created_at: string;
}

@ObjectType()
export class StoryInteractionType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => ID) 
    @IsString()
    story_id: string;

    @Field() 
    @IsBoolean()
    is_bookmarked: boolean;

    @Field() 
    @IsBoolean()
    is_read: boolean;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    journal_response?: string;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_before?: number;

    @Field(() => Int, { nullable: true }) 
    @IsString()
    @IsOptional()
    mood_after?: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    read_at?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    bookmarked_at?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    responded_at?: string;
}

@ObjectType()
export class EraType {
    @Field() 
    @IsString()
    era: string;

    @Field() 
    @IsString()
    label: string;

    @Field(() => Int) 
    @IsNumber()
    count: number;
}

// ================================= Input Types =======================================

@InputType()
export class MarkReadInput {
    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_before?: number;
}

@InputType()
export class ReflectInput {
    @Field() 
    @IsString()
    journal_response: string;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_before?: number;

    @Field(() => Int, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    mood_after?: number;
}
