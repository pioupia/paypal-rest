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

        try {
            console.log(base_url + url, data);
            const response = await fetch(base_url + url, data);

            let responseBody: any;
            if (response.headers.get('Content-Type') === 'application/json')
                responseBody = await response.json();
            else
                responseBody = await response.text();

            return resolve(responseBody);
        } catch (e) {
            return reject(e);
        }
    });
}