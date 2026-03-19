import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosResolver } from './sos.resolver';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [SosService, SosResolver]
})
export class SosModule {}
