export interface ConfigProps {
    mode: 'sandbox' | 'live';
    client_id?: string;
    client_secret?: string;
}

export interface PrivateConfigProps extends ConfigProps {
    base_url: 'https://api-m.sandbox.paypal.com/' | 'https://api-m.paypal.com/'
}