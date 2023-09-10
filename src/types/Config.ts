interface ConfigMode {
    mode: 'sandbox' | 'live';
}

export interface ConfigProps extends Partial<ConfigMode>{
    client_id: string;
    client_secret: string;
}

type ConfigExtendedProps = Omit<Partial<ConfigProps>, 'mode'> & ConfigMode;

export interface PrivateConfigProps extends ConfigExtendedProps {
    base_url: 'https://api-m.sandbox.paypal.com/' | 'https://api-m.paypal.com/',
    access_token?: string;
}