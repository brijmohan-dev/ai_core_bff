import {
    Int, Resolver, 
    Query, Mutation, Args
} from '@nestjs/graphql';
import { 
    JournalEntryType, DailyPromptType, 
    CreateJournalInput, UpdateJournalInput 
} from '@/journal/dto/journal.types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { MessageResult } from '@/common/types/common.types';
import { JournalService } from '@/journal/journal.service';

 
@Resolver(() => JournalEntryType)
export class JournalResolver {
    constructor(private readonly journal: JournalService) {}

    @Query(() => [JournalEntryType])
    @UseGuards(JwtAuthGuard)
    async myJournals(
        @AuthToken() token: string,
        @Args('startDate', { nullable: true }) startDate?: string,
        @Args('endDate', { nullable: true }) endDate?: string,
        @Args('limit', { type: () => Int, defaultValue: 20 }) limit?: number,
    ): Promise<JournalEntryType[]> {
        return this.journal.listJournals(
            token, 
            {
                start_date: startDate, 
                end_date: endDate, 
                limit 
            }
        ) as Promise<JournalEntryType[]>;
    }

    @Query(() => JournalEntryType)
    @UseGuards(JwtAuthGuard)
    async journalEntry(
        @AuthToken() token: string, 
        @Args('id') id: string
    ): Promise<JournalEntryType> {
        return this.journal.getJournal(token, id) as Promise<JournalEntryType>;
    }

    @Query(() => DailyPromptType)
    @UseGuards(JwtAuthGuard)
    async dailyPrompt(
        @AuthToken() token: string
    ): Promise<DailyPromptType> {
        return this.journal.getDailyPrompt(token) as Promise<DailyPromptType>;
    }

    @Mutation(() => JournalEntryType)
    @UseGuards(JwtAuthGuard)
    async createJournalEntry(
        @AuthToken() token: string, 
        @Args('input') input: CreateJournalInput
    ): Promise<JournalEntryType> {
        return this.journal.createJournal(token, input) as Promise<JournalEntryType>;
    }

    @Mutation(() => JournalEntryType)
    @UseGuards(JwtAuthGuard)
    async updateJournalEntry(
        @AuthToken() token: string,
        @Args('id') id: string,
        @Args('input') input: UpdateJournalInput,
    ): Promise<JournalEntryType> {
    return this.journal.updateJournal(token, id, input) as Promise<JournalEntryType>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async deleteJournalEntry(
        @AuthToken() token: string, 
        @Args('id') id: string
    ): Promise<MessageResult> {
        return this.journal.deleteJournal(token, id) as Promise<MessageResult>;
    }
}
