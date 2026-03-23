import {
    ObjectType, Field, InputType, ID, Float, Int
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class ProfessionalType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => ID) 
    @IsString()
    user_id: string;

    @Field() 
    @IsString()
    professional_type: string;

    @Field() 
    @IsString()
    license_number: string;

    @Field() 
    @IsString()
    license_state: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    specialisations: string[];

    @Field(() => Int) 
    @IsNumber()
    years_experience: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    bio?: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    languages: string[];

    @Field(() => Float) 
    @IsNumber()
    session_rate: number;

    @Field() 
    @IsString()
    currency: string;

    @Field() 
    @IsString()
    verification_status: string;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    rating?: number;

    @Field(() => Int) 
    @IsNumber()
    total_sessions: number;

    @Field() 
    @IsBoolean()
    is_available: boolean;
}

@ObjectType()
export class AppointmentType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => ID) 
    @IsString()
    user_id: string;

    @Field(() => ID) 
    @IsString()
    professional_id: string;

    @Field() 
    @IsString()
    session_type: string;

    @Field() 
    @IsString()
    status: string;

    @Field() 
    @IsString()
    scheduled_at: string;

    @Field(() => Int) 
    @IsNumber()
    duration_minutes: number;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    video_room_id?: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    ai_pre_summary?: string;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    amount_charged?: number;

    @Field() 
    @IsString()
    payment_status: string;

    @Field() 
    @IsString()
    created_at: string;
}

@InputType()
export class BookAppointmentInput {
    @Field(() => ID) 
    @IsString()
    professional_id: string;

    @Field({ defaultValue: 'video' }) 
    @IsString()
    @IsOptional()
    session_type: string;

    @Field() 
    @IsString()
    scheduled_at: string;

    @Field(() => Int, { defaultValue: 50 }) 
    @IsNumber()
    @IsOptional()
    duration_minutes: number;
}