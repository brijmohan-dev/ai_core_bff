import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

@ObjectType()
export class AuthPayload {
	@Field() 
	@IsString()
	access_token: string;

	@Field()
	@IsString()
	refresh_token: string;

	@Field() 
	@IsString()
	token_type: string;

	@Field() 
	@IsNumber()
	expires_in: number;
}

@InputType()
export class RegisterInput {
	@Field()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsString()
	@MinLength(8)
	@IsNotEmpty()
	password: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	last_name: string;
}

@InputType()
export class LoginInput {
	@Field()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	password: string;
}

@InputType()
export class RefreshInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	refresh_token: string;
}
