import { Module } from '@nestjs/common';
import { ProfessionalsResolver } from './professionals.resolver';
import { ProfessionalsService } from './professionals.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [ProfessionalsResolver, ProfessionalsService]
})
export class ProfessionalsModule {}
