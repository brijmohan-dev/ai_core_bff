import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ThrottlerModule } from '@nestjs/throttler';
import { Request, Response } from 'express';

import { GraphQLContext } from './common/types/graphql-context';
import { CoreClientModule } from './core-client/core-client.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { JournalModule } from './journal/journal.module';
import { MoodModule } from './mood/mood.module';
import { ActivitiesModule } from './activities/activities.module';
import { CommunityModule } from './community/community.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { SosModule } from './sos/sos.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
	imports: [
		// Config
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),

		// GraphQL (code-first)
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const isProd = configService.get<string>('NODE_ENV') === 'production';
				return {
					autoSchemaFile: true,
					playground: false,
					plugins: isProd ? [] : [ApolloServerPluginLandingPageLocalDefault()],
					subscriptions: {
						'graphql-ws': {
							path: '/graphql',
						},
					},
					context: ({
						req,
						res,
					}: {
						req: Request;
						res: Response;
					}): GraphQLContext => ({
						req,
						res,
					}),
					cors: {
						origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
						credentials: true,
					},
					formatError: (error) => {
						// Custom error formatting
						return {
							message: error.message,
							code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
							path: error.path,
						};
					},
				};
			},
		}),

		// Rate Limiting
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => [{
				ttl: config.get('THROTTLE_TTL', 60000),
				limit: config.get('THROTTLE_LIMIT', 100),
			}],
		}),

		// Feature Modules
		CoreClientModule,
		AuthModule,
		UsersModule,
		ChatModule,
		JournalModule,
		MoodModule,
		ActivitiesModule,
		CommunityModule,
		ProfessionalsModule,
		SosModule,
		AnalyticsModule,
	],
})
export class AppModule {}
