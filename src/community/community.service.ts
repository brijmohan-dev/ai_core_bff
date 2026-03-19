import { CoreClientService } from '@/core-client/core-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunityService {
    constructor(private readonly core: CoreClientService) {}

    async listCommunities(params?: any) {
        return this.core.get('/communities', undefined, params); 
    }

    async joinCommunity(token: string, id: string) { 
        return this.core.post(`/communities/${id}/join`, {}, token); 
    }

    async leaveCommunity(token: string, id: string) {
        return this.core.post(`/communities/${id}/leave`, {}, token); 
    }

    async getCommunityPosts(id: string, params?: any) {
        return this.core.get(`/communities/${id}/posts`, undefined, params); 
    }

    async createPost(token: string, communityId: string, body: any) {
        return this.core.post(`/communities/${communityId}/posts`, body, token); 
    }

    async reactToPost(token: string, postId: string, body: any) {
        return this.core.post(`/communities/posts/${postId}/react`, body, token); 
    }
}
