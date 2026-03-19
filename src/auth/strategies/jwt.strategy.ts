import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get<string>('JWT_SECRET', 'fallback-secret'),
		});
	}

	async validate(payload: { sub: string; role: string; type: string }) {
		if (payload.type !== 'access') {
			throw new UnauthorizedException('Invalid token type');
		}
		return { userId: payload.sub, role: payload.role };
	}
}
