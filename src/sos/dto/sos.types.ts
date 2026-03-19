import {
    ObjectType, Field, InputType, ID, Float
} from '@nestjs/graphql';

@ObjectType()
export class SOSEventType {
    @Field(() => ID) id: string;
    @Field() trigger_source: string;
    @Field({ nullable: true }) crisis_type?: string;
    @Field(() => [String]) contacts_notified: string[];
    @Field() location_shared: boolean;
    @Field() resolved: boolean;
    @Field() triggered_at: string;
}

@InputType()
export class TriggerSOSInput {
    @Field({ defaultValue: 'manual_button' }) trigger_source: string;
    @Field({ nullable: true }) crisis_type?: string;
    @Field(() => Float, { nullable: true }) latitude?: number;
    @Field(() => Float, { nullable: true }) longitude?: number;
    @Field({ defaultValue: false }) share_location: boolean;
}