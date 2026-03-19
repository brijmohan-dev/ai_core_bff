import {
    Resolver, Query, Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommunityType, CommunityPostType, CreatePostInput } from '@/community/dto/community.types';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { MessageResult } from '@/common/types/common.types';
import { CommunityService } from '@/community/community.service';

@Resolver(() => CommunityType)
export class CommunityResolver {
    constructor(private readonly community: CommunityService) {}

    @Query(() => [CommunityType])
    async communities(
        @Args('therapyType', { nullable: true }) therapyType?: string,
        @Args('search', { nullable: true }) search?: string,
    ): Promise<CommunityType[]> {
        return this.community.listCommunities({ therapy_type: therapyType, search }) as Promise<CommunityType[]>;
    }

    @Query(() => [CommunityPostType])
    async communityPosts(
        @Args('communityId') communityId: string
    ): Promise<CommunityPostType[]> {
        return this.community.getCommunityPosts(communityId) as Promise<CommunityPostType[]>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async joinCommunity(
        @AuthToken() token: string, 
        @Args('communityId') communityId: string
    ): Promise<MessageResult> {
        return this.community.joinCommunity(token, communityId) as Promise<MessageResult>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async leaveCommunity(
        @AuthToken() token: string, 
        @Args('communityId') communityId: string
    ): Promise<MessageResult> {
        return this.community.leaveCommunity(token, communityId) as Promise<MessageResult>;
    }

    @Mutation(() => CommunityPostType)
    @UseGuards(JwtAuthGuard)
    async createCommunityPost(
        @AuthToken() token: string,
        @Args('communityId') communityId: string,
        @Args('input') input: CreatePostInput,
    ): Promise<CommunityPostType> {
        return this.community.createPost(token, communityId, input) as Promise<CommunityPostType>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async reactToPost(
        @AuthToken() token: string, 
        @Args('postId') postId: string, 
        @Args('emoji') emoji: string
    ): Promise<MessageResult> {
        return this.community.reactToPost(token, postId, { emoji }) as Promise<MessageResult>;
    }
}

