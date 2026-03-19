import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    constructor(private readonly core: CoreClientService) {}

    async createChatSession(token: string, body: any) {
        return this.core.post('/chat/sessions', body, token);
    }

    async listChatSessions(token: string, params?: any) {
        return this.core.get('/chat/sessions', token, params);
    }

    async getChatSession(token: string, id: string) {
        return this.core.get(`/chat/sessions/${id}`, token); 
    }

    async getChatMessages(token: string, sessionId: string) {
        return this.core.get(`/chat/sessions/${sessionId}/messages`, token);
    }

    async sendMessage(token: string, body: any) {
        return this.core.post('/chat/messages', body, token);
    }

    async endChatSession(token: string, id: string) {
        return this.core.post(`/chat/sessions/${id}/end`, {}, token);
    }

    async getSessionSummary(token: string, id: string) {
        return this.core.get(`/chat/sessions/${id}/summary`, token);
    }
}
