import {
    ObjectType, Field, InputType, ID, Float, Int
} from '@nestjs/graphql';

@ObjectType()
export class ProfessionalType {
    @Field(() => ID) id: string;
    @Field(() => ID) user_id: string;
    @Field() professional_type: string;
    @Field() license_number: string;
    @Field() license_state: string;
    @Field(() => [String]) specialisations: string[];
    @Field(() => Int) years_experience: number;
    @Field({ nullable: true }) bio?: string;
    @Field(() => [String]) languages: string[];
    @Field(() => Float) session_rate: number;
    @Field() currency: string;
    @Field() verification_status: string;
    @Field(() => Float, { nullable: true }) rating?: number;
    @Field(() => Int) total_sessions: number;
    @Field() is_available: boolean;
}

@ObjectType()
export class AppointmentType {
    @Field(() => ID) id: string;
    @Field(() => ID) user_id: string;
    @Field(() => ID) professional_id: string;
    @Field() session_type: string;
    @Field() status: string;
    @Field() scheduled_at: string;
    @Field(() => Int) duration_minutes: number;
    @Field({ nullable: true }) video_room_id?: string;
    @Field({ nullable: true }) ai_pre_summary?: string;
    @Field(() => Float, { nullable: true }) amount_charged?: number;
    @Field() payment_status: string;
    @Field() created_at: string;
}

@InputType()
export class BookAppointmentInput {
    @Field(() => ID) professional_id: string;
    @Field({ defaultValue: 'video' }) session_type: string;
    @Field() scheduled_at: string;
    @Field(() => Int, { defaultValue: 50 }) duration_minutes: number;
}