import { Module } from '@nestjs/common';
import { JournalResolver } from './journal.resolver';
import { JournalService } from './journal.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [JournalResolver, JournalService]
})
export class JournalModule {}
