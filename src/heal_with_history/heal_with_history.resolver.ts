import {
    Resolver, Query, Mutation, Args, Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { 
    HistoryFigureType, HistoryStoryCardType, HistoryStoryFullType,
    EraType, StoryInteractionType, MarkReadInput, ReflectInput
} from '@/heal_with_history/dto/heal_with_history.types';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { HealWithHistoryService } from '@/heal_with_history/heal_with_history.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class HealWithHistoryResolver {
    constructor(private readonly service: HealWithHistoryService) {}

    @Query(() => [HistoryFigureType])
    async historyCatalogue(
        @Context() ctx: any,
        @Args('era', { nullable: true }) era?: string,
    ) {
        return this.service.historyCatalogue(ctx, era);
    }

    @Query(() => [HistoryStoryCardType])
    async historyStories(
        @Context() ctx: any,
        @Args('era',      { nullable: true }) era?: string,
        @Args('theme',    { nullable: true }) theme?: string,
        @Args('mood',     { nullable: true }) mood?: string,
        @Args('featured', { nullable: true }) featured?: boolean,
    ) {
        return this.service.historyStories(ctx, era, theme, mood, featured);
    }

    @Query(() => HistoryStoryFullType)
    async historyStory(
        @Context() ctx: any,
        @Args('figureSlug') figureSlug: string,
    ) {
        return this.service.historyStory(ctx, figureSlug);
    }

    @Query(() => [EraType])
    async historyEras(@Context() ctx: any) {
        return this.service.historyEras(ctx);
    }

    @Query(() => [HistoryStoryCardType])
    async myHistoryBookmarks(@Context() ctx: any) {
        return this.service.myHistoryBookMarks(ctx);
    }

    @Mutation(() => StoryInteractionType)
    async markHistoryStoryRead(
        @Context() ctx: any,
        @Args('figureSlug') figureSlug: string,
        @Args('input', { nullable: true }) input?: MarkReadInput,
    ) {
        return this.service.markHistoryStoryRead(ctx, figureSlug, input)
    }

    @Mutation(() => StoryInteractionType)
    async toggleHistoryBookmark(
        @Context() ctx: any,
        @Args('figureSlug') figureSlug: string,
    ) {
        return this.service.toggleHistoryBookmark(ctx, figureSlug)
    }

    @Mutation(() => StoryInteractionType)
    async saveHistoryReflection(
        @Context() ctx: any,
        @Args('figureSlug') figureSlug: string,
        @Args('input') input: ReflectInput,
    ) {
        return this.service.saveHistoryReflection(ctx, figureSlug, input)
    }

    @Mutation(() => HistoryStoryFullType)
    async regenerateHistoryStory(
        @Context() ctx: any,
        @Args('figureSlug') figureSlug: string,
    ) {
        return this.service.regenerateHistoryStory(ctx, figureSlug);
    }
}
