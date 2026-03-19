import {
	ObjectType, Field, InputType, ID, Int,
} from '@nestjs/graphql';

@ObjectType()
export class UserType {
	@Field(() => ID) id: string;
	@Field() email: string;
	@Field() first_name: string;
	@Field() last_name: string;
	@Field({ nullable: true }) phone?: string;
	@Field({ nullable: true }) gender?: string;
	@Field({ nullable: true }) avatar_url?: string;
	@Field() role: string;
	@Field() is_verified: boolean;
	@Field() onboarding_completed: boolean;
	@Field() timezone: string;
	@Field() language: string;
	@Field() created_at: string;
}

@ObjectType()
export class HealthProfileType {
	@Field(() => ID) id: string;
	@Field(() => [String]) therapy_types: string[];
	@Field({ nullable: true }) primary_concern?: string;
	@Field(() => Int, { nullable: true }) phq9_score?: number;
	@Field(() => Int, { nullable: true }) gad7_score?: number;
	@Field(() => Int, { nullable: true }) pcl5_score?: number;
	@Field() severity_level: string;
	@Field(() => [String]) goals: string[];
	@Field(() => [String]) triggers: string[];
	@Field() updated_at: string;
}

@ObjectType()
export class EmergencyContactType {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() phone: string;
	@Field({ nullable: true }) email?: string;
	@Field() relationship: string;
	@Field() is_primary: boolean;
	@Field() notify_on_sos: boolean;
	@Field() created_at: string;
}

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true }) first_name?: string;
	@Field({ nullable: true }) last_name?: string;
	@Field({ nullable: true }) phone?: string;
	@Field({ nullable: true }) timezone?: string;
	@Field({ nullable: true }) language?: string;
}

@InputType()
export class UpdateHealthProfileInput {
	@Field(() => [String], { nullable: true }) therapy_types?: string[];
	@Field({ nullable: true }) primary_concern?: string;
	@Field(() => Int, { nullable: true }) phq9_score?: number;
	@Field(() => Int, { nullable: true }) gad7_score?: number;
	@Field(() => [String], { nullable: true }) goals?: string[];
	@Field(() => [String], { nullable: true }) triggers?: string[];
}

@InputType()
export class AddEmergencyContactInput {
	@Field() name: string;
	@Field() phone: string;
	@Field({ nullable: true }) email?: string;
	@Field() relationship: string;
	@Field({ defaultValue: false }) is_primary: boolean;
	@Field({ defaultValue: true }) notify_on_sos: boolean;
}