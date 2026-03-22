import { Module } from '@nestjs/common';
import { HealWithHistoryResolver } from './heal_with_history.resolver';
import { HealWithHistoryService } from './heal_with_history.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
  imports: [CoreClientModule],
  providers: [HealWithHistoryResolver, HealWithHistoryService]
})
export class HealWithHistoryModule {}

