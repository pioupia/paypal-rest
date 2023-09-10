import { getConfig, setAccessToken } from "./ConfigManager";
import PaypalTSError, { configError } from "./Errors";

export default function auth(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        const { client_id, client_secret, base_url } = getConfig();

        if (!client_id || !client_secret)
            return reject(configError());

        try {
            const auth = Buffer.from(client_id + ":" + client_secret)
                .toString("base64");

            const response = await fetch(`${base_url}v1/oauth2/token`, {
                method: "post",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: 'Basic ' + auth,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const data = await response.json();
            if (data.error) {
                return reject(data.error);
            }

            setAccessToken(data.access_token);
            return resolve(true);
        } catch (e) {
            throw new PaypalTSError("An error has occurred during the auth with PayPal. Error:" + e);
        }
    });
}