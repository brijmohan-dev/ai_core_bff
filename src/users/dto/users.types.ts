import {
	ObjectType, Field, InputType, ID, Int,
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class UserType {
	@Field(() => ID) 
	@IsString()
	id: string;

	@Field() 
	@IsString()
	email: string;

	@Field() 
	@IsString()
	first_name: string;

	@Field() 
	@IsString()
	last_name: string;

	@Field({ nullable: true }) 
	@IsString()
	@IsOptional()
	phone?: string;

	@Field({ nullable: true }) 
	@IsString()
	@IsOptional()
	gender?: string;

	@Field({ nullable: true }) 
	@IsString()
	@IsOptional()
	avatar_url?: string;

	@Field() 
	@IsString()
	role: string;

	@Field() 
	@IsBoolean()
	is_verified: boolean;

	@Field() 
	@IsBoolean()
	onboarding_completed: boolean;

	@Field() 
	@IsString()
	timezone: string;

	@Field() 
	@IsString()
	language: string;

	@Field() 
	@IsString()
	created_at: string;
}

@ObjectType()
export class HealthProfileType {
	@Field(() => ID) 
	@IsString()
	id: string;

	@Field(() => [String]) 
	@IsArray()
	@IsString({ each: true })
	therapy_types: string[];

	@Field({ nullable: true }) 
	@IsString()
	@IsOptional()
	primary_concern?: string;

	@Field(() => Int, { nullable: true }) 
	@IsOptional()
	@IsNumber()
	phq9_score?: number;

	@Field(() => Int, { nullable: true }) 
	@IsOptional()
	@IsNumber()
	gad7_score?: number;

	@Field(() => Int, { nullable: true }) 
	@IsOptional()
	@IsNumber()
	pcl5_score?: number;

	@Field() 
	@IsString()
	severity_level: string;

	@Field(() => [String]) 
	@IsArray()
	@IsString({ each: true })
	goals: string[];

	@Field(() => [String]) 
	@IsArray()
	@IsString({ each: true })
	triggers: string[];

	@Field()
	@IsString()
	updated_at: string;
}

@ObjectType()
export class EmergencyContactType {
	@Field(() => ID) 
	@IsString()
	id: string;

	@Field() 
	@IsString()
	name: string;

	@Field() 
	@IsString()
	phone: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	email?: string;

	@Field()
	@IsString()
	relationship: string;

	@Field() 
	@IsBoolean()
	is_primary: boolean;
	
	@Field() 
	@IsBoolean()
	notify_on_sos: boolean;

	@Field() 
	@IsString()
	created_at: string;
}

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	first_name?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	last_name?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	phone?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	timezone?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	language?: string;
}

@InputType()
export class UpdateHealthProfileInput {
	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	therapy_types?: string[];

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	primary_concern?: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	phq9_score?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	gad7_score?: number;

	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	goals?: string[];

	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	triggers?: string[];
}

@InputType()
export class AddEmergencyContactInput {
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	phone: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	email?: string;

	@Field()
	@IsString()
	relationship: string;

	@Field({ defaultValue: false })
	@IsOptional()
	@IsBoolean()
	is_primary: boolean;

	@Field({ defaultValue: true })
	@IsOptional()
	@IsBoolean()
	notify_on_sos: boolean;
}
