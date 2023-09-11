import { getConfig, setAccessToken } from "./ConfigManager";
import PaypalTSError, { configError } from "./Errors";

export default function auth(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        const { client_id, client_secret, base_url, auto_renew, token_expire_at } = getConfig();

        if (!client_id || !client_secret)
            return reject(configError());

        if (token_expire_at > Date.now())
            return resolve(true);

        try {
            const authorization = Buffer.from(client_id + ":" + client_secret)
                .toString("base64");

            const response = await fetch(`${base_url}v1/oauth2/token`, {
                method: "post",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: 'Basic ' + authorization,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const data = await response.json();
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