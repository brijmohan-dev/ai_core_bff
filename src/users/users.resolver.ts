import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { 
    UserType, UpdateUserInput, HealthProfileType, 
    UpdateHealthProfileInput, EmergencyContactType, AddEmergencyContactInput
} from '@/users/dto/users.types'
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard'
import { MessageResult } from '@/common/types/common.types';
import { UsersService } from '@/users/users.service';


@Resolver(() => UserType)
export class UsersResolver {
    constructor(private readonly users: UsersService) {}

    @Query(() => UserType, { description: 'Get the currently authenticated user' })
    @UseGuards(JwtAuthGuard)
    async me(
        @AuthToken() token: string
    ): Promise<UserType> {
        return this.users.getMe(token) as Promise<UserType>;
    }

    @Mutation(() => UserType)
    @UseGuards(JwtAuthGuard)
    async updateMe(
        @AuthToken() token: string,
        @Args('input') input: UpdateUserInput
    ): Promise<UserType> {
        return this.users.updateMe(token, input) as Promise<UserType>;
    }

    @Query(() => HealthProfileType)
    @UseGuards(JwtAuthGuard)
    async myHealthProfile(
        @AuthToken() token: string
    ): Promise<HealthProfileType> {
        return this.users.getHealthProfile(token) as Promise<HealthProfileType>;
    }

    @Mutation(() => HealthProfileType)
    @UseGuards(JwtAuthGuard)
    async updateHealthProfile(
        @AuthToken() token: string,
        @Args('input') input: UpdateHealthProfileInput,
    ): Promise<HealthProfileType> {
        console.log('updateHealthProfile hit', { hasToken: !!token, input });
        return this.users.updateHealthProfile(token, input) as Promise<HealthProfileType>;
    }

    @Query(() => [EmergencyContactType])
    @UseGuards(JwtAuthGuard)
    async myEmergencyContacts(
        @AuthToken() token: string
    ): Promise<EmergencyContactType[]> {
        return this.users.getEmergencyContacts(token) as Promise<EmergencyContactType[]>;
    }

    @Mutation(() => EmergencyContactType)
    @UseGuards(JwtAuthGuard)
    async addEmergencyContact(
        @AuthToken() token: string,
        @Args('input') input: AddEmergencyContactInput,
    ): Promise<EmergencyContactType> {
        return this.users.addEmergencyContact(token, input) as Promise<EmergencyContactType>;
    }

    @Mutation(() => MessageResult)
    @UseGuards(JwtAuthGuard)
    async deleteEmergencyContact(
        @AuthToken() token: string, 
        @Args('id') id: string
    ): Promise<MessageResult> {
        return this.users.deleteEmergencyContact(token, id) as Promise<MessageResult>;
    }
}

