import { getConfig, setAccessToken } from "./Config";
import PaypalTSError, { configError } from "../Manager/Errors";
import requestManager from "../Manager/RequestManager";

export default function auth(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        const { client_id, client_secret, base_url, auto_renew, token_expire_at } = getConfig();

        if (!client_id || !client_secret)
            return reject(configError());

        if (token_expire_at > Date.now())
            return resolve(true);

        const authorization = Buffer.from(client_id + ":" + client_secret)
            .toString("base64");

        try {
            const data = await requestManager('v1/oauth2/token', {
                method: 'POST',
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: 'Basic ' + authorization,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }, true);

            if (data.error) {
                return reject(data.error);
            }

            setAccessToken(data.access_token, data.expires_in);

            if (auto_renew) {
                setTimeout(() => {
                    auth();
                }, (data.expires_in - 5) * 1_000);
            }

            return resolve(true);
        } catch (e) {
            throw new PaypalTSError("An error has occurred during the auth with PayPal. Error:" + e);
        }
    });
}