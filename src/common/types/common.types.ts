import { ObjectType, Field } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class MessageResult {
	@Field() 
	@IsString()
	message: string;

	@Field() 
	@IsBoolean()
	success: boolean;
}