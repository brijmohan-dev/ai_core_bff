import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class MessageResult {
	@Field() message: string;
	@Field() success: boolean;
}