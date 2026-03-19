import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [
		CoreClientModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '15m' },
			}),
		}),
	],
	providers: [AuthResolver, JwtStrategy, AuthService],
	exports: [JwtModule, PassportModule],
})
export class AuthModule {}
