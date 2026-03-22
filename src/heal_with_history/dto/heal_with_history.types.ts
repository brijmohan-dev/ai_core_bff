import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';

@ObjectType()
export class HistoryFigureType {
    @Field() slug: string;
    @Field() name: string;
    @Field() era: string;
    @Field({ nullable: true }) era_label?: string;
    @Field({ nullable: true }) period?: string;
    @Field({ nullable: true }) origin?: string;
    @Field({ nullable: true }) tagline?: string;
    @Field({ nullable: true }) image_emoji?: string;
    @Field({ nullable: true }) primary_theme?: string;
    @Field(() => Int) sort_order: number;
    @Field() generated: boolean;
}

@ObjectType()
export class HistoryStoryCardType {
    @Field(() => ID) id: string;
    @Field() figure_slug: string;
    @Field() figure_name: string;
    @Field() figure_era: string;
    @Field({ nullable: true }) figure_era_label?: string;
    @Field({ nullable: true }) figure_period?: string;
    @Field({ nullable: true }) figure_origin?: string;
    @Field({ nullable: true }) figure_tagline?: string;
    @Field({ nullable: true }) figure_emoji?: string;
    @Field({ nullable: true }) figure_primary_theme?: string;
    @Field() title: string;
    @Field({ nullable: true }) subtitle?: string;
    @Field(() => [String]) emotional_themes: string[];
    @Field(() => [String]) mood_tags: string[];
    @Field(() => Int) reading_minutes: number;
    @Field() is_featured: boolean;
    @Field(() => Int) view_count: number;
    @Field(() => Int) sort_order: number;
    @Field() generated_at: string;
}

@ObjectType()
export class HistoryStoryFullType extends HistoryStoryCardType {
    @Field() the_story: string;
    @Field() the_parallel: string;
    @Field() reflection_prompt: string;
    @Field() created_at: string;
}

@ObjectType()
export class StoryInteractionType {
    @Field(() => ID) id: string;
    @Field(() => ID) story_id: string;
    @Field() is_bookmarked: boolean;
    @Field() is_read: boolean;
    @Field({ nullable: true }) journal_response?: string;
    @Field(() => Int, { nullable: true }) mood_before?: number;
    @Field(() => Int, { nullable: true }) mood_after?: number;
    @Field({ nullable: true }) read_at?: string;
    @Field({ nullable: true }) bookmarked_at?: string;
    @Field({ nullable: true }) responded_at?: string;
}

@ObjectType()
export class EraType {
    @Field() era: string;
    @Field() label: string;
    @Field(() => Int) count: number;
}

// ================================= Input Types =======================================

@InputType()
export class MarkReadInput {
    @Field(() => Int, { nullable: true }) mood_before?: number;
}

@InputType()
export class ReflectInput {
    @Field() journal_response: string;
    @Field(() => Int, { nullable: true }) mood_before?: number;
    @Field(() => Int, { nullable: true }) mood_after?: number;
}
