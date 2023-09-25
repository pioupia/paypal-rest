import {
    JSONTaxes,
    SubscriptionsInlinePlanBuilderProps,
    Taxes
} from "../types/Subscriptions";
import BillingCycleBuilder from "./BillingCycleBuilder";
import PaymentPreferencesBuilder from "./PaymentPreferencesBuilder";
import { BillingCycleProps } from "../types/BillingCycle";
import PaypalTSError from "../Manager/Errors";
import { PaymentPreferencesProps } from "../types/PaymentPreferences";

export default class SubscriptionInlinePlanBuilder {
    protected billing_cycles: BillingCycleBuilder[];
    protected payment_preferences?: PaymentPreferencesBuilder;
    protected taxes?: Taxes;

    constructor(data?: Partial<SubscriptionsInlinePlanBuilderProps>) {
        this.billing_cycles = data?.billing_cycles?.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        }) || [];
        this.payment_preferences = (data?.payment_preferences instanceof PaymentPreferencesBuilder) ? data.payment_preferences : new PaymentPreferencesBuilder(data?.payment_preferences);
        this.taxes = data?.taxes;
    }

    public addBillingCycle(...billing_cycle: (BillingCycleBuilder | BillingCycleProps)[]): SubscriptionInlinePlanBuilder {
        if (billing_cycle.length + this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles.push(...billing_cycle.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        }));
        return this;
    }

    public setBillingCycles(...billing_cycles: (BillingCycleBuilder | BillingCycleProps)[]): SubscriptionInlinePlanBuilder {
        if (billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles = billing_cycles.map(billingCycle => {
            return (billingCycle instanceof BillingCycleBuilder) ? billingCycle : new BillingCycleBuilder(billingCycle);
        });
        return this;
    }

    public setPaymentPreferences(payment_preferences: PaymentPreferencesBuilder | PaymentPreferencesProps): SubscriptionInlinePlanBuilder {
        this.payment_preferences = (payment_preferences instanceof PaymentPreferencesBuilder) ? payment_preferences : new PaymentPreferencesBuilder(payment_preferences);
        return this;
    }

    public setTaxes(taxes: Taxes): SubscriptionInlinePlanBuilder {
        this.taxes = taxes;
        return this;
    }

    public toJSON(): Readonly<Partial<SubscriptionsInlinePlanBuilderProps<'JSON'>>> {
        this.validate();
        return {
            billing_cycles: this.billing_cycles.map(billingCycle => {
                return billingCycle.toJSON();
            }),
            payment_preferences: this.payment_preferences?.toJSON(),
            taxes: this.taxes as JSONTaxes | undefined
        }
    }

    protected validate(): void {
        if (this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.payment_preferences?.toJSON();
        this.billing_cycles.forEach(billingCycle => {
            billingCycle.toJSON();
        });
        if (this.taxes) {
            if (!this.taxes.percentage || !/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/.test(this.taxes.percentage.toString()))
                throw new PaypalTSError("Invalid taxes.percentage the taxes.percentage must be a number.");
        }
    }
}