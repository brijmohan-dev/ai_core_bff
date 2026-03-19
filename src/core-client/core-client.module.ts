import { Module } from '@nestjs/common';
import { CoreClientService } from './core-client.service';

@Module({
	providers: [CoreClientService],
	exports: [CoreClientService],
})
export class CoreClientModule {}
