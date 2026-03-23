import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload, RegisterInput, LoginInput, RefreshInput } from './dto/auth.types';

@Resolver()
export class AuthResolver {
	constructor(private readonly auth: AuthService) {}

	@Mutation(() => AuthPayload, { description: 'Register a new user account' })
	async register(
		@Args('input') input: RegisterInput
	): Promise<AuthPayload> {
		console.log(input)
		return this.auth.register(input) as Promise<AuthPayload>;
	}

	@Mutation(() => AuthPayload, { description: 'Login with email and password' })
	async login(
		@Args('input') input: LoginInput
	): Promise<AuthPayload> {
		return this.auth.login(input) as Promise<AuthPayload>;
	}

	@Mutation(() => AuthPayload, { description: 'Refresh access token using refresh token' })
	async refreshToken(
		@Args('input') input: RefreshInput
	): Promise<AuthPayload> {
		return this.auth.refreshToken(input) as Promise<AuthPayload>;
	}

	@Mutation(() => Boolean, { description: 'Logout and invalidate session' })
	async logout(
		@Context() context: any
	): Promise<boolean> {
		const token = context.req?.headers?.authorization?.replace('Bearer ', '');
		if (token) await this.auth.logout(token);
		return true;
	}
}
