import { ConfigProps, PrivateConfigProps } from "../types/Config";

const default_configuration: PrivateConfigProps = {
    mode: 'sandbox',
    base_url: 'https://api-m.sandbox.paypal.com/'
}

export default function config({ mode, client_id, client_secret }: Required<ConfigProps>) {
    default_configuration.mode = mode;
    default_configuration.client_id = client_id;
    default_configuration.client_secret = client_secret;

    if (mode === 'sandbox')
        default_configuration.base_url = 'https://api-m.sandbox.paypal.com/';
    else
        default_configuration.base_url = 'https://api-m.paypal.com/';
}