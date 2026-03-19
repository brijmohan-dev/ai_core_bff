import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
	@Field() access_token: string;
	@Field() refresh_token: string;
	@Field() token_type: string;
	@Field() expires_in: number;
}

@InputType()
export class RegisterInput {
	@Field() email: string;
	@Field() password: string;
	@Field() first_name: string;
	@Field() last_name: string;
}

@InputType()
export class LoginInput {
	@Field() email: string;
	@Field() password: string;
}

@InputType()
export class RefreshInput {
	@Field() refresh_token: string;
}
