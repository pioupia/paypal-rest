export type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "PATCH";
export interface LinksData {
    href: string;
    rel: string;
    method?: HTTP_METHOD;
}