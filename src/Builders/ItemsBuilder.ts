import { Amount, CategoryType, ItemsBuilderProps } from "../types/Order";
import UnitBuilder from "./UnitBuilder";
import PaypalTSError from "../Manager/Errors";

export default class ItemsBuilder {
    private name: string;
    private quantity: number;
    private description?: string;
    private sku?: string;
    private category?: CategoryType;
    private unit_amount: UnitBuilder;

    constructor(data?: Partial<ItemsBuilderProps>) {
        this.name = data?.name || '';
        this.quantity = data?.quantity || 1;
        this.unit_amount = data?.unit_amount || new UnitBuilder();

        this.sku = data?.sku;
        this.category = data?.category;
    }

    setName(name: string): ItemsBuilder {
        if (!name || name.length > 127)
            throw new PaypalTSError("The length of the name must be between 1 and 127 characters.");

        this.name = name;
        return this;
    }

    setQuantity(quantity: number): ItemsBuilder {
        if (quantity > 9_999_999_999 || quantity % 1 !== 0 || quantity < 0)
            throw new PaypalTSError("The quantity cannot exceed 10 digits and must be a whole number.");

        this.quantity = quantity;
        return this;
    }

    setDescription(description: string): ItemsBuilder {
        if (description.length > 127)
            throw new PaypalTSError("The length of the description must be between 1 and 127 characters.");

        this.description = description;
        return this;
    }

    setSKU(sku: string): ItemsBuilder {
        if (sku.length > 127)
            throw new PaypalTSError("The length of the sku must be between 1 and 127 characters.");

        this.description = sku;
        return this;
    }

    setCategory(category: CategoryType): ItemsBuilder {
        if (!['DIGITAL_GOODS', 'PHYSICAL_GOODS', 'DONATION'].includes(category))
            throw new PaypalTSError("Category is invalid. Allowed categories: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION'");

        this.category = category;
        return this;
    }

    setUnitAmount(amount: UnitBuilder | Amount): ItemsBuilder {
        if (amount instanceof UnitBuilder) {
            if (typeof amount.toJSON().value === "string") {
                this.unit_amount = amount;
            } else {
                throw new PaypalTSError("The unit amount should be a unit builder.");
            }

            return this;
        }

        this.unit_amount = new UnitBuilder(amount);
        return this;
    }

    toJSON() {
        this.verifyData();
        return Object.freeze(
            {
                name: this.name,
                unit_amount: this.unit_amount,
                quantity: this.quantity.toString(),
                description: this.description,
                sku: this.sku,
                category: this.category
            }
        )
    }

    private verifyData() {
        if (!this.name || this.name.length > 127)
            throw new PaypalTSError("The length of the name must be between 1 and 127 characters.");

        if ((this.description?.length || 0) > 127)
            throw new PaypalTSError("The length of the description must be between 1 and 127 characters.");

        if (this.quantity > 9_999_999_999 || this.quantity % 1 !== 0 || this.quantity < 0)
            throw new PaypalTSError("The quantity cannot exceed 10 digits, cannot be negative and must be a whole number.");

        if ((this.sku?.length || 0) > 127)
            throw new PaypalTSError("The length of the sku must be between 1 and 127 characters.");

        if (this.category && !['DIGITAL_GOODS', 'PHYSICAL_GOODS', 'DONATION'].includes(this.category))
            throw new PaypalTSError("Category is invalid. Allowed categories: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION'");

        this.unit_amount.toJSON();
    }
}