import { JSONTaxes, SubscriptionsBuilderProps, SubscriptionsStatus, Taxes } from "../types/Subscriptions";
import ProductBuilder from "./ProductBuilder";
import BillingCycleBuilder from "./BillingCycleBuilder";
import PaymentPreferencesBuilder from "./PaymentPreferencesBuilder";
import PaypalTSError from "../Manager/Errors";
import { BillingCycleProps } from "../types/BillingCycle";
import { PaymentPreferencesProps } from "../types/PaymentPreferences";
import { ProductUpdateBuilder } from "./ProductUpdateBuilder";

const ALLOWS_STATUS = ["ACTIVE", "INACTIVE", "CREATED"];

export default class SubscriptionBuilder {
    private product_id?: string;
    private name?: string;
    private billing_cycles: BillingCycleBuilder[];
    private payment_preferences?: PaymentPreferencesBuilder;
    private status?: SubscriptionsStatus;
    private description?: string;
    private quantity_supported?: boolean;
    private taxes?: Taxes;

    constructor(data?: Partial<SubscriptionsBuilderProps>) {
        if (data?.product_id) {
            this.product_id = (data.product_id instanceof ProductBuilder) || (data.product_id instanceof ProductUpdateBuilder) ? data.product_id.toJSON().id : data.product_id;
        }
        this.name = data?.name;
        this.billing_cycles = data?.billing_cycles?.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        }) || [];
        this.payment_preferences = (data?.payment_preferences instanceof PaymentPreferencesBuilder) ? data.payment_preferences : new PaymentPreferencesBuilder(data?.payment_preferences);
        this.status = data?.status;
        this.description = data?.description;
        this.quantity_supported = data?.quantity_supported;
        this.taxes = data?.taxes;
    }

    public setProductId(product_id: string | ProductBuilder | ProductUpdateBuilder): SubscriptionBuilder {
        const id = (product_id instanceof ProductBuilder) || (product_id instanceof ProductUpdateBuilder) ? product_id.toJSON().id : product_id;
        if (!id?.length || id.length < 6 || id.length > 50)
            throw new PaypalTSError("Invalid product_id the length must be between 6 and 50 characters.");

        this.product_id = id;
        return this;
    }

    public setName(name: string): SubscriptionBuilder {
        if (!name.length || name.length > 127)
            throw new PaypalTSError("Invalid name the length must be between 1 and 127 characters.");

        this.name = name;
        return this;
    }

    public setStatus(status: SubscriptionsStatus): SubscriptionBuilder {
        if (!ALLOWS_STATUS.includes(status))
            throw new PaypalTSError(`Invalid status the status must be one of the following: ${ALLOWS_STATUS.join(", ")}`);

        this.status = status;
        return this;
    }

    public setDescription(description: string): SubscriptionBuilder {
        if (description.length > 127)
            throw new PaypalTSError("Invalid description the length must be less than 127 characters.");

        this.description = description;
        return this;
    }

    public setQuantitySupported(quantity_supported: boolean): SubscriptionBuilder {
        this.quantity_supported = quantity_supported;
        return this;
    }

    public setTaxes(taxes: Taxes): SubscriptionBuilder {
        this.taxes = taxes;
        return this;
    }

    public addBillingCycle(...billing_cycle: (BillingCycleBuilder | BillingCycleProps)[]): SubscriptionBuilder {
        if (billing_cycle.length + this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles.push(...billing_cycle.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        }));
        return this;
    }

    public setBillingCycles(...billing_cycles: (BillingCycleBuilder | BillingCycleProps)[]): SubscriptionBuilder {
        if (billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles = billing_cycles.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        });
        return this;
    }

    public setPaymentPreferences(payment_preferences: PaymentPreferencesBuilder | PaymentPreferencesProps): SubscriptionBuilder {
        this.payment_preferences = (payment_preferences instanceof PaymentPreferencesBuilder) ? payment_preferences : new PaymentPreferencesBuilder(payment_preferences);
        return this;
    }

    public toJSON(): Readonly<SubscriptionsBuilderProps<'JSON'>> {
        this.validate();
        return {
            product_id: this.product_id!,
            name: this.name!,
            status: this.status,
            billing_cycles: this.billing_cycles.map(billingCycle => {
                return billingCycle.toJSON();
            }),
            payment_preferences: this.payment_preferences!.toJSON(),
            description: this.description,
            quantity_supported: this.quantity_supported,
            taxes: this.taxes as JSONTaxes | undefined
        }
    }

    private validate(): void {
        if (!this.product_id?.length || this.product_id.length < 6 || this.product_id.length > 50)
            throw new PaypalTSError("Invalid product_id the length must be between 6 and 50 characters.");
        if (!this.name?.length || this.name.length > 127)
            throw new PaypalTSError("Invalid name the length must be between 1 and 127 characters.");
        if (!this.billing_cycles.length)
            throw new PaypalTSError("billing_cycle are required.");
        if (this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");
        if (!this.payment_preferences)
            throw new PaypalTSError("payment_preferences are required.");
        this.payment_preferences.toJSON();

        this.billing_cycles.forEach(billingCycle => {
            billingCycle.toJSON();
        });

        if (this.status && !ALLOWS_STATUS.includes(this.status))
            throw new PaypalTSError(`Invalid status the status must be one of the following: ${ALLOWS_STATUS.join(", ")}`);
        if (this.description && this.description.length > 127)
            throw new PaypalTSError("Invalid description the length must be less than 127 characters.");
        if (this.quantity_supported && typeof this.quantity_supported !== "boolean")
            throw new PaypalTSError("Invalid quantity_supported the quantity_supported must be a boolean.");
        if (this.taxes) {
            if (!this.taxes.percentage || !/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/.test(this.taxes.percentage.toString()))
                throw new PaypalTSError("Invalid taxes.percentage the taxes.percentage must be a number.");
        }
    }
}