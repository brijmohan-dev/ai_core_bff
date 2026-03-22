import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';
import { MarkReadInput, ReflectInput } from './dto/heal_with_history.types';

@Injectable()
export class HealWithHistoryService {
    constructor(private readonly core: CoreClientService) {}

    async historyCatalogue(ctx: any, era?: string) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.get('/history/catalogue', token, era ? { era } : {});
    }

    async historyStories(ctx: any, era?: string, theme?: string, mood?: string, featured?: boolean) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        const params: any = {};
        if (era)      params.era      = era;
        if (theme)    params.theme    = theme;
        if (mood)     params.mood     = mood;
        if (featured !== undefined) params.featured = featured;
        return this.core.get('/history/stories', token, params);
    }

    async historyStory(ctx: any, figureSlug?: string) {
        // This may take a few seconds on first call (AI generation)
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.get(`/history/stories/${figureSlug}`, token);
    }

    async historyEras(ctx: any) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.get('/history/meta/eras', token);
    }

    async myHistoryBookMarks(ctx: any) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.get('/history/my/bookmarks', token);
    }

    async markHistoryStoryRead(ctx: any, figureSlug: string, input?: MarkReadInput) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.post(`/history/stories/${figureSlug}/read`, input || {}, token);
    }

    async toggleHistoryBookmark(ctx: any, figureSlug: string) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.post(`/history/stories/${figureSlug}/bookmark`, {}, token);
    }

    async saveHistoryReflection(ctx: any, figureSlug: string, input:ReflectInput) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.post(`/history/stories/${figureSlug}/reflect`, input, token);
    }

    async regenerateHistoryStory(ctx: any, figureSlug: string) {
        const token = ctx.req?.headers?.authorization?.replace('Bearer ', '');
        return this.core.post(`/history/stories/${figureSlug}/regenerate`, {}, token);
    }
}
