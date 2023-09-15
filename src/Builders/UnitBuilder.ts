import { CurrencyCodes, PurchaseUnitBuilderProps, UnitBuilderJSON, acceptedCurrencyCodes } from "../types/Order";
import PaypalTSError from "../Manager/Errors";


const floatingCurrency = ['HUF', 'JPY', 'TWD'];

export default class UnitBuilder {
    private currency_code: CurrencyCodes | acceptedCurrencyCodes;
    private value: number;
    private readonly overwritePrice: boolean;

    constructor(data?: Partial<PurchaseUnitBuilderProps>) {
        this.currency_code = data?.currency_code || 'EUR';
        this.value = data?.value || 1;
        this.overwritePrice = data?.overwritePrice ?? false;

        this.verifyData();
    }

    setPrice(price: number): UnitBuilder {
        if (floatingCurrency.includes(this.currency_code) &&
            price % 1 !== 0) {
            if (!this.overwritePrice)
                throw new PaypalTSError("The price could not be floating with the currency " + this.currency_code);

            price = Math.round(price);
        }

        this.value = price;
        return this;
    }

    setCurrency(currency: CurrencyCodes | acceptedCurrencyCodes): UnitBuilder {
        if (floatingCurrency.includes(currency) &&
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
                currency_code: this.currency_code,
                value: this.value.toString()
            }
        );
    }

    private verifyData() {
        if (floatingCurrency.includes(this.currency_code) &&
            this.value % 1 !== 0) {
            if (!this.overwritePrice)
                throw new PaypalTSError("The price could not be floating with the currency " + this.currency_code);

            this.value = Math.round(this.value);
        }

        if(this.value.toString().length > 32)
            throw new PaypalTSError("The price could not do more than 32 characters.");
    }
}