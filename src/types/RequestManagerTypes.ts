import { HTTP_METHOD } from "./index";

export interface RequestManager {
    method: HTTP_METHOD;
    headers?: HeadersInit;
    body?: string;
}

export interface QueryParams {
   [key: string]: string | number | boolean | undefined;
}

export type RequestManagerProps = RequestManager & { query?: QueryParams };