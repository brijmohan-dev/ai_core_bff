import { Injectable, Logger, UnauthorizedException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

@Injectable()
export class CoreClientService {
	private readonly http: AxiosInstance;
	private readonly logger = new Logger(CoreClientService.name);

	constructor(private config: ConfigService) {
		const baseURL = config.get<string>('CORE_SERVICE_URL', 'http://localhost:8000');

		this.http = axios.create({
			baseURL: `${baseURL}/api/v1`,
			timeout: 30000,
			headers: { 'Content-Type': 'application/json' },
		});

		// Request logging
		this.http.interceptors.request.use((cfg) => {
			this.logger.debug(`→ ${cfg.method?.toUpperCase()} ${cfg.url}`);
			return cfg;
		});

		// Response error normalisation
		this.http.interceptors.response.use(
			(res) => res,
			(err: AxiosError) => {
				const status = err.response?.status;
				const data: any = err.response?.data;
				const detail =
					data?.detail ??
					data?.message ??
					data?.error ??
					data ??
					err.message;
				const detailStr = typeof detail === 'string' ? detail : JSON.stringify(detail);
				const method = err.config?.method?.toUpperCase();
				const url = err.config?.url;
				this.logger.error(
					`Core API error ${status} ${method ?? ''} ${url ?? ''}: ${detailStr}`,
				);

				if (status === 401) throw new UnauthorizedException(detail);
				throw new HttpException(detail, status || 500);
			},
		);
	}

	// ================================= Generic helpers ==================================

	async get<T>(
		path: string,
		token?: string,
		params?: Record<string, any>,
		extra: AxiosRequestConfig = {},
	): Promise<T> {
		const cfg = this._cfg(token, { params, ...extra });
		const { data } = await this.http.get<T>(path, cfg);
		return data;
	}

	async post<T>(path: string, body: any, token?: string): Promise<T> {
		const { data } = await this.http.post<T>(path, body, this._cfg(token));
		return data;
	}

	async put<T>(path: string, body: any, token?: string): Promise<T> {
		const { data } = await this.http.put<T>(path, body, this._cfg(token));
		return data;
	}

	async patch<T>(path: string, body: any, token?: string): Promise<T> {
		const { data } = await this.http.patch<T>(path, body, this._cfg(token));
		return data;
	}

	async delete<T>(path: string, token?: string): Promise<T> {
		const { data } = await this.http.delete<T>(path, this._cfg(token));
		return data;
	}

	// ====================================== Private ===================================

	private _cfg(token?: string, extra: AxiosRequestConfig = {}): AxiosRequestConfig {
		return {
			...extra,
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...extra.headers,
			},
		};
	}
}
