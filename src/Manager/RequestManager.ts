import { RequestManagerProps } from "../types/RequestManagerTypes";
import { getConfig } from "../Functions/Config";
import { configError, expireToken } from "./Errors";
import { auth } from "../index";

export default function requestManager(url: string, data: RequestManagerProps, isAuth?: boolean): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let { base_url, access_token, token_expire_at, auto_renew } = getConfig();

        if (url.startsWith('/'))
            url = url.slice(1);

        if (!isAuth) {
            if (auto_renew) {
                if (!access_token || token_expire_at < Date.now()) {
                    await auth();
                    access_token = getConfig().access_token;
                }
            } else if (!access_token)
                return configError();
            else if (token_expire_at < Date.now())
                return expireToken();
        }

        data.headers = new Headers(data.headers);
        if (!data.headers.has('Authorization'))
            data.headers.set('Authorization', 'Bearer ' + access_token);

        if (data.query) {
            let query = '?';
            for (const key in data.query) {
                if (typeof data.query[key] === 'undefined')
                    continue;

                url += query + key + '=' + encodeURIComponent(data.query[key] as string | number | boolean);
                query = '&';
            }

            delete data.query;
        }

        try {
            const response = await fetch(base_url + url, data);

            let responseBody: any;
            if (response.headers.get('Content-Type') === 'application/json')
                responseBody = await response.json();
            else
                responseBody = await response.text();

            if (response.status < 200 || response.status >= 400)
                return reject(responseBody ? responseBody : response);

            return resolve(responseBody);
        } catch (e) {
            return reject(e);
        }
    });
}