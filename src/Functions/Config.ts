import { ConfigProps, PrivateConfigProps } from "../types/Config";
import PaypalTSError from "../Manager/Errors";

const default_configuration: PrivateConfigProps = {
    mode: 'sandbox',
    base_url: 'https://api-m.sandbox.paypal.com/',
    auto_renew: true,
    token_expire_at: 0
}

export default function config({ mode, client_id, client_secret, auto_renew }: Omit<ConfigProps, 'token_expire_at'>) {
    if (!client_secret || !client_id)
        throw new PaypalTSError("The `client_id` and `client_secret` value are both required.");

    if (mode)
        default_configuration.mode = mode;

    if (typeof auto_renew === 'boolean')
        default_configuration.auto_renew = auto_renew;

    default_configuration.client_id = client_id;
    default_configuration.client_secret = client_secret;

    if (default_configuration.mode === 'sandbox')
        default_configuration.base_url = 'https://api-m.sandbox.paypal.com/';
    else
        default_configuration.base_url = 'https://api-m.paypal.com/';
}

export function getConfig() {
    return Object.freeze({ ...default_configuration });
}

export function setAccessToken(access_token: string, expireIn: number) {
    default_configuration.access_token = access_token;
    default_configuration.token_expire_at = Date.now() + (expireIn * 1_000);
}