import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const logger = new Logger('Bootstrap');

	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug'],
	});

	const config = app.get(ConfigService);
	const port = config.get<number>('PORT', 3000);
	const allowedOrigins = config.get<string>('ALLOWED_ORIGINS', '').split(',').map((o) => o.trim());

	// Security
	app.use(
		helmet({
			contentSecurityPolicy: false, // Disabled for GraphQL playground
			crossOriginEmbedderPolicy: false,
		}),
	);

	// CORS
	app.enableCors({
		origin: allowedOrigins,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
	});

	// Global validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);

	await app.listen(port);
	logger.log(`🚀 MindBridge BFF running on http://localhost:${port}`);
	logger.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
