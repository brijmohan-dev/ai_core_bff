import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { CoreClientModule } from '@/core-client/core-client.module';

@Module({
	imports: [CoreClientModule],
	providers: [ChatResolver, ChatService]
})
export class ChatModule {}
