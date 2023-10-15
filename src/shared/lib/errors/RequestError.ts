import { AxiosError, AxiosResponse } from 'axios';

export class RequestError extends AxiosError {
    // public errors: string[] = [];

    constructor(
        public readonly errors: string[],
        public readonly code?: string,
        public readonly response?: AxiosResponse<unknown, any>,
    ) {
        super('Request error');
        this.name = 'RequestError';
        // this.errors = errors;
    }
}
