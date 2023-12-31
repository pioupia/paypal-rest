interface ConfigMode {
    mode: 'sandbox' | 'live';
    auto_renew: boolean;
    token_expire_at: number;
}

export interface ConfigProps extends Partial<ConfigMode> {
    client_id: string;
    client_secret: string;
}

type ConfigExtendedProps = Omit<Partial<ConfigProps>, 'mode' | 'auto_renew'> & ConfigMode;

export interface PrivateConfigProps extends ConfigExtendedProps {
    base_url: 'https://api-m.sandbox.paypal.com/' | 'https://api-m.paypal.com/',
    access_token?: string;
}