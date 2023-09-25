import {
    JSONTaxes,
    SubscriptionsPlanBuilderProps,
    SubscriptionsPlanJSON,
    SubscriptionsStatus
} from "../types/Subscriptions";
import ProductBuilder from "./ProductBuilder";
import PaypalTSError from "../Manager/Errors";
import { ProductUpdateBuilder } from "./ProductUpdateBuilder";
import { createSubscriptionPlan } from "../Functions/Subscriptions";
import SubscriptionInlinePlanBuilder from "./SubscriptionInlinePlanBuilder";

const ALLOWS_STATUS = ["ACTIVE", "INACTIVE", "CREATED"];

export default class SubscriptionPlanBuilder extends SubscriptionInlinePlanBuilder {
    private product_id?: string;
    private name?: string;
    private status?: SubscriptionsStatus;
    private description?: string;
    private quantity_supported?: boolean;

    constructor(data?: Partial<SubscriptionsPlanBuilderProps>) {
        super(data);

        if (data?.product_id) {
            this.product_id = (data.product_id instanceof ProductBuilder) || (data.product_id instanceof ProductUpdateBuilder) ? data.product_id.toJSON().id : data.product_id;
        }
        this.name = data?.name;
        this.status = data?.status;
        this.description = data?.description;
        this.quantity_supported = data?.quantity_supported;
    }

    public setProductId(product_id: string | ProductBuilder | ProductUpdateBuilder): SubscriptionPlanBuilder {
        const id = (product_id instanceof ProductBuilder) || (product_id instanceof ProductUpdateBuilder) ? product_id.toJSON().id : product_id;
        if (!id?.length || id.length < 6 || id.length > 50)
            throw new PaypalTSError("Invalid product_id the length must be between 6 and 50 characters.");

        this.product_id = id;
        return this;
    }

    public setName(name: string): SubscriptionPlanBuilder {
        if (!name.length || name.length > 127)
            throw new PaypalTSError("Invalid name the length must be between 1 and 127 characters.");

        this.name = name;
        return this;
    }

    public setStatus(status: SubscriptionsStatus): SubscriptionPlanBuilder {
        if (!ALLOWS_STATUS.includes(status))
            throw new PaypalTSError(`Invalid status the status must be one of the following: ${ALLOWS_STATUS.join(", ")}`);

        this.status = status;
        return this;
    }

    public setDescription(description: string): SubscriptionPlanBuilder {
        if (description.length > 127)
            throw new PaypalTSError("Invalid description the length must be less than 127 characters.");

        this.description = description;
        return this;
    }

    public setQuantitySupported(quantity_supported: boolean): SubscriptionPlanBuilder {
        this.quantity_supported = quantity_supported;
        return this;
    }

    public create(): Promise<SubscriptionsPlanJSON> {
        return new Promise(async (resolve, reject) => {
            createSubscriptionPlan(this.toJSON()).then(resolve).catch(reject);
        });
    }

    public toJSON(): Readonly<SubscriptionsPlanBuilderProps<'JSON'>> {
        this.validate();

        return {
            product_id: this.product_id!,
            name: this.name!,
            status: this.status,
            billing_cycles: super.billing_cycles.map(billingCycle => {
                return billingCycle.toJSON();
            }),
            payment_preferences: super.payment_preferences!.toJSON(),
            description: this.description,
            quantity_supported: this.quantity_supported,
            taxes: super.taxes as JSONTaxes | undefined
        }
    }

    protected validate(): void {
        if (!this.product_id?.length || this.product_id.length < 6 || this.product_id.length > 50)
            throw new PaypalTSError("Invalid product_id the length must be between 6 and 50 characters.");
        if (!this.name?.length || this.name.length > 127)
            throw new PaypalTSError("Invalid name the length must be between 1 and 127 characters.");

        super.validate();

        if (!super.billing_cycles.length)
            throw new PaypalTSError("billing_cycle are required.");
        if (!super.payment_preferences)
            throw new PaypalTSError("payment_preferences are required.");

        if (this.status && !ALLOWS_STATUS.includes(this.status))
            throw new PaypalTSError(`Invalid status the status must be one of the following: ${ALLOWS_STATUS.join(", ")}`);
        if (this.description && this.description.length > 127)
            throw new PaypalTSError("Invalid description the length must be less than 127 characters.");
        if (this.quantity_supported && typeof this.quantity_supported !== "boolean")
            throw new PaypalTSError("Invalid quantity_supported the quantity_supported must be a boolean.");
    }
}