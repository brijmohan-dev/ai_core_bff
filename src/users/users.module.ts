import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [UsersResolver, UsersService]
})
export class UsersModule {}
