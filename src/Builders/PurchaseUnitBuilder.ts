import {
    acceptedCurrencyCodes,
    Amount,
    CurrencyCodes,
    PurchaseUnitBuilderJSON,
    PurchaseUnitBuilderProps
} from "../types/Order";
import PaypalTSError from "../Manager/Errors";
import UnitBuilder from "./UnitBuilder";
import ItemsBuilder from "./ItemsBuilder";

export default class PurchaseUnitBuilder {
    private reference_id?: string;
    private description?: string;
    private readonly amount: UnitBuilder;
    private items: ItemsBuilder[];

    constructor(data?: Partial<Amount>) {
        this.amount = new UnitBuilder(data);
        this.items = [];
    }

    setDescription(description: string): PurchaseUnitBuilder {
        if (description && description.length > 127)
            throw new PaypalTSError("The length of a purchase unit description must be between 1 and 127 characters.");

        this.description = description;

        return this;
    }

    setPrice(price: number): PurchaseUnitBuilder {
        this.amount.setPrice(price);
        return this;
    }

    setCurrency(currency: CurrencyCodes | acceptedCurrencyCodes): PurchaseUnitBuilder {
        this.amount.setCurrency(currency);
        return this;
    }

    setReferenceID(reference_id: string): PurchaseUnitBuilder {
        if (reference_id.length > 256)
            throw new PaypalTSError("The length of the reference ID must be between 1 and 256 characters.");

        this.reference_id = reference_id;
        return this;
    }

    setItems(...items: ItemsBuilder[]): PurchaseUnitBuilder {
        this.items = items;
        return this;
    }

    addItems(...items: ItemsBuilder[]): PurchaseUnitBuilder {
        this.items.push(...items);
        return this;
    }

    toJSON(): Readonly<PurchaseUnitBuilderJSON> {
        const data: PurchaseUnitBuilderJSON = {
            amount: {
                ...this.amount.toJSON()
            }
        }

        if (this.reference_id)
            data.reference_id = this.reference_id;

        if (this.description)
            data.description = this.description;

        if (this.items.length) {
            const length = this.items.length;
            data.items = new Array(length);

            data.amount.breakdown = {
                item_total: {
                    currency_code: this.items[0].toJSON().unit_amount.currency_code,
                    value: 0
                }
            }

            for (let i = 0; i < length; i++) {
                const item = this.items[i].toJSON();
                data.items[i] = item;
                (data.amount.breakdown.item_total.value as number) += Number(item.unit_amount.value) * Number(item.quantity);
            }

            data.amount.breakdown.item_total.value = data.amount.breakdown.item_total.value.toString();
        }

        return Object.freeze(data);
    }
}