import { Module } from '@nestjs/common';
import { MoodResolver } from './mood.resolver';
import { MoodService } from './mood.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
  imports: [CoreClientModule],
  providers: [MoodResolver, MoodService]
})
export class MoodModule {}
