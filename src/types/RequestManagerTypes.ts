export interface RequestManagerProps {
    method: 'POST' | 'GET' | 'PATCH';
    headers?: HeadersInit;
    body?: string;
}