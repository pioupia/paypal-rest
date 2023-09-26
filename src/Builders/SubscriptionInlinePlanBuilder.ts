import {
    JSONTaxes,
    SubscriptionsInlinePlanBuilderProps,
    Taxes
} from "../types/Subscriptions";
import PaymentPreferencesBuilder from "./PaymentPreferencesBuilder";
import { InlineBillingCycleProps } from "../types/BillingCycle";
import PaypalTSError from "../Manager/Errors";
import { PaymentPreferencesProps } from "../types/PaymentPreferences";
import PricingSchemeBuilder from "./PricingSchemeBuilder";

export default class SubscriptionInlinePlanBuilder {
    protected billing_cycles: InlineBillingCycleProps[];
    protected payment_preferences?: PaymentPreferencesBuilder;
    protected taxes?: Taxes;

    constructor(data?: Partial<SubscriptionsInlinePlanBuilderProps>) {
        this.billing_cycles = data?.billing_cycles || [];
        this.payment_preferences = (data?.payment_preferences instanceof PaymentPreferencesBuilder) ? data.payment_preferences : new PaymentPreferencesBuilder(data?.payment_preferences);
        this.taxes = data?.taxes;
    }

    public addBillingCycle(...billing_cycle: (InlineBillingCycleProps)[]): SubscriptionInlinePlanBuilder {
        if (billing_cycle.length + this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles.push(...billing_cycle);
        return this;
    }

    public setBillingCycles(...billing_cycles: (InlineBillingCycleProps)[]): SubscriptionInlinePlanBuilder {
        if (billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.billing_cycles = billing_cycles;
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
            billing_cycles: this.billing_cycles.map(({ sequence, pricing_scheme, total_cycles }) => {
                const data: InlineBillingCycleProps<'JSON'> = {
                    sequence,
                    total_cycles
                };
                if (pricing_scheme) {
                    data.pricing_scheme = (pricing_scheme instanceof PricingSchemeBuilder) ?
                        pricing_scheme.toJSON() :
                        new PricingSchemeBuilder(pricing_scheme).toJSON();
                }
                return data;
            }),
            payment_preferences: this.payment_preferences?.toJSON(),
            taxes: this.taxes as JSONTaxes | undefined
        }
    }

    protected validate(): void {
        if (this.billing_cycles.length > 12)
            throw new PaypalTSError("Invalid billing_cycle the length must be less than 12.");

        this.payment_preferences?.toJSON();
        this.billing_cycles.forEach(({ sequence, pricing_scheme, total_cycles }) => {
            if (typeof sequence !== 'number' || isNaN(sequence) || sequence < 1 || sequence > 99 || sequence % 1 !== 0)
                throw new PaypalTSError("Invalid billing_cycle.sequence the billing_cycle.sequence must be a valid integer between 1 and 99.");
            if (total_cycles && (isNaN(total_cycles) || total_cycles < 0 || total_cycles > 999 || total_cycles % 1 !== 0))
                throw new PaypalTSError("Invalid billing_cycle.total_cycles the billing_cycle.total_cycles must be a valid integer between 0 and 999.");
            if (pricing_scheme) {
                if (pricing_scheme instanceof PricingSchemeBuilder) {
                    pricing_scheme.toJSON();
                } else {
                    new PricingSchemeBuilder(pricing_scheme).toJSON();
                }
            }
        });
        if (this.taxes) {
            if (!this.taxes.percentage || !/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/.test(this.taxes.percentage.toString()))
                throw new PaypalTSError("Invalid taxes.percentage the taxes.percentage must be a number.");
        }
    }
}