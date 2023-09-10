import { Amount, CurrencyCodes, PurchaseUnitBuilderProps } from "../types/Order";
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
        if (!description || description.length > 127)
            throw new PaypalTSError("The length of a purchase unit description must be between 1 and 127 characters.");

        this.description = description;

        return this;
    }

    setPrice(price: number): PurchaseUnitBuilder {
        this.amount.setPrice(price);
        return this;
    }

    setCurrency(currency: CurrencyCodes): PurchaseUnitBuilder {
        this.amount.setCurrency(currency);
        return this;
    }

    setReferenceID(reference_id: string): PurchaseUnitBuilder {
        if (!reference_id || reference_id.length > 256)
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

    toJSON() {
        return Object.freeze(
            {
                reference_id: this.reference_id,
                description: this.description,
                amount: JSON.stringify(this.amount),
                items: this.items.map(i => i.toJSON())
            }
        );
    }
}