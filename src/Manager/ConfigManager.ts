import { ConfigProps, PrivateConfigProps } from "../types/Config";

const default_configuration: PrivateConfigProps = {
    mode: 'sandbox',
    base_url: 'https://api-m.sandbox.paypal.com/',
    auto_renew: true
}

export default function config({ mode, client_id, client_secret, auto_renew }: ConfigProps) {
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

export function setAccessToken(access_token: string) {
    default_configuration.access_token = access_token;
}