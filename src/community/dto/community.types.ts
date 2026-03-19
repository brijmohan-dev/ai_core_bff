import {
    ObjectType, Field, InputType, ID, Int
} from '@nestjs/graphql';


@ObjectType()
export class CommunityType {
    @Field(() => ID) id: string;
    @Field() name: string;
    @Field() description: string;
    @Field() therapy_type: string;
    @Field() is_private: boolean;
    @Field(() => Int) member_count: number;
    @Field(() => [String]) rules: string[];
    @Field({ nullable: true }) banner_url?: string;
    @Field() created_at: string;
}

@ObjectType()
export class CommunityPostType {
    @Field(() => ID) id: string;
    @Field(() => ID) community_id: string;
    @Field() content: string;
    @Field() is_anonymous: boolean;
    @Field() is_pinned: boolean;
    @Field() moderation_status: string;
    @Field() created_at: string;
}

@InputType()
export class CreatePostInput {
    @Field() content: string;
    @Field({ defaultValue: false }) is_anonymous: boolean;
}