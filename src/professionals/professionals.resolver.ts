import {
    Resolver, Query, Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfessionalType, AppointmentType, BookAppointmentInput } from '@/professionals/dto/professionals.types';
import { JwtAuthGuard, AuthToken } from '@/common/guards/jwt-auth.guard';
import { ProfessionalsService } from '@/professionals/professionals.service';

@Resolver(() => ProfessionalType)
export class ProfessionalsResolver {
    constructor(private readonly profession: ProfessionalsService ) {}

    @Query(() => [ProfessionalType])
    async professionals(
        @Args('professionalType', { nullable: true }) professionalType?: string,
        @Args('specialisation', { nullable: true }) specialisation?: string,
        @Args('availableOnly', { defaultValue: false }) availableOnly?: boolean,
    ): Promise<ProfessionalType[]> {
        return this.profession.listProfessionals({
            professional_type: professionalType,
            specialisation,
            available_only: availableOnly,
        }) as Promise<ProfessionalType[]>;
    }

    @Query(() => ProfessionalType)
    async professional(
        @Args('id') id: string
    ): Promise<ProfessionalType> {
        return this.profession.getProfessional(id) as Promise<ProfessionalType>;
    }

    @Query(() => [AppointmentType])
    @UseGuards(JwtAuthGuard)
    async myAppointments(
        @AuthToken() token: string
    ): Promise<AppointmentType[]> {
        return this.profession.listAppointments(token) as Promise<AppointmentType[]>;
    }

    @Mutation(() => AppointmentType)
    @UseGuards(JwtAuthGuard)
    async bookAppointment(
        @AuthToken() token: string, 
        @Args('input') input: BookAppointmentInput
    ): Promise<AppointmentType> {
        return this.profession.bookAppointment(token, input) as Promise<AppointmentType>;
    }
}

