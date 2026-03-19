import {
    Resolver, Query, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { DashboardStatsType, WellnessReportType } from '@/analytics/dto/analytics.types';
import { AnalyticsService } from '@/analytics/analytics.service';

@Resolver(() => DashboardStatsType)
export class AnalyticsResolver {
    constructor(private readonly analytics: AnalyticsService) {}

    @Query(() => DashboardStatsType)
    @UseGuards(JwtAuthGuard)
    async dashboardStats(
        @AuthToken() token: string
    ): Promise<DashboardStatsType> {
        return this.analytics.getDashboardStats(token) as Promise<DashboardStatsType>;
    }

    @Query(() => WellnessReportType)
    @UseGuards(JwtAuthGuard)
    async wellnessReport(
        @AuthToken() token: string,
        @Args('reportType', { defaultValue: 'weekly' }) reportType: string,
    ): Promise<WellnessReportType> {
        return this.analytics.getWellnessReport(token, reportType) as Promise<WellnessReportType>;
    }
}
