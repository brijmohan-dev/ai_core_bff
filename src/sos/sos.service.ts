import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SosService {
    constructor(private readonly core: CoreClientService) {}

    async triggerSOS(token: string, body: any) { 
        return this.core.post('/sos/trigger', body, token); 
    }

    async sosHistory(token: string) { 
        return this.core.get('/sos/history', token); 
    }

    async resolveSOS(token: string, id: string) {
        return this.core.post(`/sos/${id}/resolve`, {}, token);
    }
}
