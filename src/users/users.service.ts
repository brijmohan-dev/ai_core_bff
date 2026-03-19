import { Injectable } from '@nestjs/common';
import { CoreClientService } from '@/core-client/core-client.service';

@Injectable()
export class UsersService {
    constructor(private readonly core: CoreClientService) {}

    async getMe(token: string) {
        return this.core.get('/users/me', token); 
    }

    async updateMe(token: string, body: any) {
        return this.core.patch('/users/me', body, token);
    }

    async getHealthProfile(token: string) {
        return this.core.get('/users/me/health-profile', token);
    }

    async updateHealthProfile(token: string, body: any) {
        return this.core.put('/users/me/health-profile', body, token);
    }

    async getEmergencyContacts(token: string) {
        return this.core.get('/users/me/emergency-contacts', token);
    }

    async addEmergencyContact(token: string, body: any) {
        return this.core.post('/users/me/emergency-contacts', body, token);
    }

    async deleteEmergencyContact(token: string, id: string) {
        return this.core.delete(`/users/me/emergency-contacts/${id}`, token);
    }

}
