type acceptedCurrencyCodes = 'AUD' | 'BRL' | 'CAD' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'HKD' | 'HUF' | 'ILS' | 'JPY' | 'MYR' | 'MXN' | 'TWD' | 'NZD' | 'NOK' | 'PHP' | 'PLN' | 'GBP' | 'RUB' | 'SGD' | 'SEK' | 'CHF' | 'THB' | 'USD';

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
    currency_code: acceptedCurrencyCodes;
    value: number;
}