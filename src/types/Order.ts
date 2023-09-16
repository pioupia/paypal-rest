import UnitBuilder from "../Builders/UnitBuilder";
import PurchaseUnitBuilder from "../Builders/PurchaseUnitBuilder";
import { LinksData } from "./index";

export type acceptedCurrencyCodes = 'AUD' | 'BRL' | 'CAD' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'HKD' | 'HUF' | 'ILS' | 'JPY' | 'MYR' | 'MXN' | 'TWD' | 'NZD' | 'NOK' | 'PHP' | 'PLN' | 'GBP' | 'RUB' | 'SGD' | 'SEK' | 'CHF' | 'THB' | 'USD';
export type CategoryType = 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION';

export enum CurrencyCodes {
    AustralianDollar = 'AUD',
    BrazilianReal = 'BRL',
    CanadianDollar = 'CAD',
    ChineseRenmenbi = 'CNY',
    CzechKoruna = 'CZK',
    DanishKrone = 'DKK',
    Euro = 'EUR',
    HongKongDollar = 'HKD',
    HungarianForint = 'HUF',
    IsraeliNewShekel = 'ILS',
    JapaneseYen = 'JPY',
    MalaysianRinggit = 'MYR',
    MexicanPeso = 'MXN',
    NewTaiwanDollar = 'TWD',
    NewZealandDollar = 'NZD',
    NorwegianKrone = 'NOK',
    PhilippinePeso = 'PHP',
    'PolishZłoty' = 'PLN',
    PoundSterling = 'GBP',
    RussianRuble = 'RUB',
    SingaporeDollar = 'SGD',
    SwedishKrona = 'SEK',
    SwissFranc = 'CHF',
    ThaiBaht = 'THB',
    UnitedStatesDollar = 'USD'
}

export interface Amount {
    currency_code: acceptedCurrencyCodes | CurrencyCodes;
    value: number;
}

export interface PurchaseUnitBuilderProps extends Partial<Amount> {
    /**
     * Automatic price overwrite according to currency code
     */
    overwritePrice?: boolean;
}

export interface ItemsBuilderProps {
    name: string;
    quantity: number;
    unit_amount: UnitBuilder;
    description?: string;
    sku?: string;
    category?: CategoryType;
}


interface PayPalPreferences {
    brand_name: string;
    shipping_preference: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
    landing_page: 'LOGIN' | 'GUEST_CHECKOUT' | 'NO_PREFERENCE';
    user_action: 'CONTINUE' | 'PAY_NOW';
    payment_method_preference: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';
    locale: string;
    return_url: string;
    cancel_url: string;
}

export interface OrderProps {
    purchase_units: PurchaseUnitBuilder[];
    intent?: 'CAPTURE' | 'AUTHORIZE';
    paypal?: Partial<PayPalPreferences>;
}

export interface UnitBuilderJSON {
    currency_code: CurrencyCodes | acceptedCurrencyCodes;
    value: string;
}

export interface ItemsBuilderJSON {
    name: string;
    unit_amount: UnitBuilderJSON;
    quantity: string;
    description?: string;
    sku?: string;
    category?: CategoryType;
}

export interface PayPalItemsBreakdown {
    item_total: {
        currency_code: CurrencyCodes | acceptedCurrencyCodes;
        value: number | string;
    }
}

export interface PayPalBreakdown {
    breakdown: PayPalItemsBreakdown;
}

export interface PurchaseUnitBuilderJSON {
    amount: UnitBuilderJSON & Partial<PayPalBreakdown>;
    reference_id?: string;
    description?: string;
    items?: ItemsBuilderJSON[];
}

export interface OrderManagerResponse {
    id: string;
    status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED';
    payment_source?: PaymentSource;
    links?: LinksData[];
    create_time?: string;
    update_time?: string;
    processing_instruction?: 'ORDER_COMPLETE_ON_PAYMENT_APPROVAL' | 'NO_INSTRUCTION';
    purchase_units?: PurchaseUnitBuilderJSON[];
}

export interface PaymentSource {
    paypal: {};
}