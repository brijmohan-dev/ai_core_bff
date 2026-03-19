import { Injectable } from '@nestjs/common';
import { CoreClientService } from '../core-client/core-client.service';

@Injectable()
export class AuthService {
	constructor(private readonly core: CoreClientService) {}

	async register(body: any) { 
		return this.core.post('/auth/register', body);
	}

	async login(body: any) {
		return this.core.post('/auth/login', body);
	}

	async refreshToken(body: any) {
		return this.core.post('/auth/refresh', body);
	}

	async logout(token: string) {
		return this.core.post('/auth/logout', {}, token);
	}
}
