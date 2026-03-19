import { Module } from '@nestjs/common';
import { CommunityResolver } from './community.resolver';
import { CommunityService } from './community.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [CommunityResolver, CommunityService]
})
export class CommunityModule {}
