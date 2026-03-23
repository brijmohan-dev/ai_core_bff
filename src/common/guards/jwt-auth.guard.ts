import {
	Injectable, ExecutionContext, UnauthorizedException, createParamDecorator,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		// return ctx.getContext().req;
		const req = ctx.getContext().req;
		console.log('auth header', req.headers?.authorization);
		return req;
	}

	handleRequest(err: any, user: any) {
		if (err || !user) {
			throw new UnauthorizedException('Authentication required');
		}
		return user;
	}
}

// Decorator to get token from request headers
export const AuthToken = createParamDecorator(
	(_data: unknown, context: ExecutionContext): string => {
		const ctx = GqlExecutionContext.create(context);
		const req = ctx.getContext().req;
		const authHeader = req.headers?.authorization || '';
		const token = authHeader.replace(/^Bearer\s+/i, '');
		if (!token) throw new UnauthorizedException('No auth token provided');
		return token;
	},
);

// Decorator to get current user payload
export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user;
	},
);
