import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalService {
    constructor(private readonly core: CoreClientService) {}

    async listJournals(token: string, params?: any) {
        return this.core.get('/journals', token, params);
    }

    async createJournal(token: string, body: any) {
        return this.core.post('/journals', body, token); 
    }

    async getJournal(token: string, id: string) {
        return this.core.get(`/journals/${id}`, token);
    }

    async updateJournal(token: string, id: string, body: any) {
        return this.core.patch(`/journals/${id}`, body, token);
    }

    async deleteJournal(token: string, id: string) {
        return this.core.delete(`/journals/${id}`, token);
    }

    async getDailyPrompt(token: string) {
        return this.core.get('/journals/daily-prompt', token);
    }
}
