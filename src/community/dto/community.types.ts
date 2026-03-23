import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';


@ObjectType()
export class CommunityType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field() 
    @IsString()
    name: string;

    @Field() 
    @IsString()
    description: string;

    @Field() 
    @IsString()
    therapy_type: string;

    @Field() 
    @IsBoolean()
    is_private: boolean;

    @Field(() => Int) 
    @IsNumber()
    member_count: number;

    @Field(() => [String]) 
    @IsArray()
    @IsString({ each: true })
    rules: string[];

    @Field({ nullable: true }) 
    @IsString()
    banner_url?: string;

    @Field() 
    @IsString()
    created_at: string;
}

@ObjectType()
export class CommunityPostType {
    @Field(() => ID) 
    @IsString()
    id: string;

    @Field(() => ID) 
    @IsString()
    community_id: string;

    @Field() 
    @IsString()
    content: string;

    @Field() 
    @IsBoolean()
    is_anonymous: boolean;

    @Field() 
    @IsBoolean()
    is_pinned: boolean;

    @Field() 
    @IsString()
    moderation_status: string;

    @Field() 
    @IsString()
    created_at: string;
}

@InputType()
export class CreatePostInput {
    @Field() 
    @IsString()
    content: string;

    @Field({ defaultValue: false }) 
    @IsBoolean()
    @IsOptional()
    is_anonymous: boolean;
}