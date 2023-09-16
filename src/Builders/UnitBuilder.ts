import { CurrencyCodes, PurchaseUnitBuilderProps, UnitBuilderJSON, acceptedCurrencyCodes } from "../types/Order";
import PaypalTSError from "../Manager/Errors";


const floatingCurrency = ['HUF', 'JPY', 'TWD'];

export default class UnitBuilder {
    private currency_code?: CurrencyCodes | acceptedCurrencyCodes;
    private value?: number;
    private readonly overwritePrice: boolean;

    constructor(data?: Partial<PurchaseUnitBuilderProps>) {
        this.currency_code = data?.currency_code;
        this.value = data?.value;
        this.overwritePrice = data?.overwritePrice ?? false;
    }

    setPrice(price: number): UnitBuilder {
        if (!price || isNaN(price) || price < 0)
            throw new PaypalTSError("The value field is required and should be a positive number.");

        if (this.currency_code && floatingCurrency.includes(this.currency_code) &&
            price % 1 !== 0) {
            if (!this.overwritePrice)
                throw new PaypalTSError("The price could not be floating with the currency " + this.currency_code);

            price = Math.round(price);
        }

        this.value = price;
        return this;
    }

    setCurrency(currency: CurrencyCodes | acceptedCurrencyCodes): UnitBuilder {
        if (this.value && floatingCurrency.includes(currency) &&
            this.value % 1 !== 0) {
            if (!this.overwritePrice)
                throw new PaypalTSError("This currency does not support floating prices.");

            this.value = Math.round(this.value);
        }

        this.currency_code = currency;
        return this;
    }

    toJSON(): Readonly<UnitBuilderJSON> {
        this.verifyData();

        return Object.freeze(
            {
                currency_code: this.currency_code as CurrencyCodes | acceptedCurrencyCodes,
                value: (this.value as number).toString()
            }
        );
    }

    private verifyData() {
        if (!this.currency_code)
            throw new PaypalTSError("The currency code field is required.");

        if (typeof this.value !== 'number' || isNaN(this.value) || this.value < 0)
            throw new PaypalTSError("The value field is required and should be a positive number.");

        if (floatingCurrency.includes(this.currency_code) &&
            this.value % 1 !== 0) {
            if (!this.overwritePrice)
                throw new PaypalTSError("The price could not be floating with the currency " + this.currency_code);

            this.value = Math.round(this.value);
        }
    }
}