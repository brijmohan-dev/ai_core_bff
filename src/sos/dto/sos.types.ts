import {
    ObjectType, Field, InputType, ID, Float
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class SOSEventType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    trigger_source: string;

    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    crisis_type?: string;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    contacts_notified: string[];

    @Field() 
    @IsBoolean()
    location_shared: boolean;

    @Field() 
    @IsBoolean()
    resolved: boolean;

    @Field() 
    @IsString()
    triggered_at: string;
}

@InputType()
export class TriggerSOSInput {
    @Field({ defaultValue: 'manual_button' }) 
    @IsString()
    @IsOptional()
    trigger_source: string;
    
    @Field({ nullable: true }) 
    @IsString()
    @IsOptional()
    crisis_type?: string;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @Field(() => Float, { nullable: true }) 
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @Field({ defaultValue: false }) 
    @IsBoolean()
    @IsOptional()
    share_location: boolean;
}