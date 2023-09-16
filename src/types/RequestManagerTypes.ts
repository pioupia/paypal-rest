import { HTTP_METHOD } from "./index";

export interface RequestManagerProps {
    method: HTTP_METHOD;
    headers?: HeadersInit;
    body?: string;
}