import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
    constructor(private readonly core: CoreClientService) {}

    async getDashboardStats(token: string) {
        return this.core.get('/analytics/dashboard', token); 
    }

    async getWellnessReport(token: string, reportType?: string) {
        return this.core.get('/analytics/wellness-report', token, { report_type: reportType });
    }
}
