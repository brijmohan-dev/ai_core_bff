import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoodService {
    constructor(private readonly core: CoreClientService) {}

    async listMoods(token: string, params?: any) {
        return this.core.get('/moods', token, params); 
    }

    async logMood(token: string, body: any) {
        return this.core.post('/moods', body, token);
    }

    async getMoodTrends(token: string, params?: any) {
        return this.core.get('/moods/trends', token, params); 
    }
}
