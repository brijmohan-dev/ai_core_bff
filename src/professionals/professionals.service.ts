import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalsService {
    constructor(private readonly core: CoreClientService) {}

    async listProfessionals(params?: any) {
        return this.core.get('/professionals', undefined, params); 
    }

    async getProfessional(id: string) {
        return this.core.get(`/professionals/${id}`); 
    }

    async registerProfessional(token: string, body: any) {
        return this.core.post('/professionals/register', body, token); 
    }

    async getPatientSummary(token: string, professionalId: string, patientId: string) {
        return this.core.get(`/professionals/${professionalId}/patient-summary`, token, { patient_user_id: patientId });
    }

    // Appointments
    async listAppointments(token: string) { 
        return this.core.get('/appointments', token); 
    }

    async bookAppointment(token: string, body: any) { 
        return this.core.post('/appointments', body, token); 
    }
}
