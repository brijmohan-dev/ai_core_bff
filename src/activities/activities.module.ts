import { Module } from '@nestjs/common';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [ActivitiesResolver, ActivitiesService]
})
export class ActivitiesModule {}
