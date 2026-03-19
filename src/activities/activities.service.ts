import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivitiesService {
    constructor(private readonly core: CoreClientService) {}

    async listActivities(params?: any) {
        return this.core.get('/activities', undefined, params);
    }

    async logActivitySession(token: string, body: any) {
        return this.core.post('/activities/sessions', body, token);
    }

    async listActivitySessions(token: string, params?: any) {
        return this.core.get('/activities/sessions', token, params);
    }

    async getActivityStreak(token: string) {
        return this.core.get('/activities/streak', token);
    }
}
