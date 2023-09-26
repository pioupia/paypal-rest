// Mock a sample data object
import { PaymentPreferencesBuilder, SubscriptionInlinePlanBuilder } from "../src";
import PaypalTSError from "../src/Manager/Errors";

const sampleData = {
    billing_cycles: [
        {
            sequence: 1,
            total_cycles: 5,
        },
    ],
    payment_preferences: {
        auto_bill_outstanding: true,
    },
    taxes: {
        percentage: 10,
    },
};

describe("SubscriptionInlinePlanBuilder", () => {
    it("should initialize with default values", () => {
        const builder = new SubscriptionInlinePlanBuilder();
        expect(builder.toJSON()).toEqual({
            billing_cycles: [],
            payment_preferences: undefined,
            taxes: undefined,
        });
    });

    it("should initialize with provided data", () => {
        const builder = new SubscriptionInlinePlanBuilder(sampleData);
        expect(builder.toJSON()).toEqual(sampleData);
    });

    it("should add billing cycles", () => {
        const builder = new SubscriptionInlinePlanBuilder();
        builder.addBillingCycle({ sequence: 1, total_cycles: 5 });
        builder.addBillingCycle({ sequence: 2, total_cycles: 10 });
        expect(builder.toJSON().billing_cycles?.length).toBe(2);
    });

    it("should set billing cycles", () => {
        const builder = new SubscriptionInlinePlanBuilder();
        builder.setBillingCycles({ sequence: 1, total_cycles: 5 });
        expect(builder.toJSON().billing_cycles!.length).toBe(1);
    });

    it("should set payment preferences", () => {
        const paymentPreferences = new PaymentPreferencesBuilder({
            auto_bill_outstanding: true,
        });
        const builder = new SubscriptionInlinePlanBuilder();
        builder.setPaymentPreferences(paymentPreferences);
        expect(builder.toJSON().payment_preferences).toEqual(
            paymentPreferences.toJSON()
        );
    });

    it("should set taxes", () => {
        const builder = new SubscriptionInlinePlanBuilder();
        builder.setTaxes({ percentage: 10 });
        expect(builder.toJSON().taxes).toEqual({ percentage: 10 });
    });

    it("should throw an error for invalid billing cycle length", () => {
        const builder = new SubscriptionInlinePlanBuilder();
        expect(() => {
            builder.addBillingCycle(
                ...Array.from({ length: 13 }, (_, i) => ({
                    sequence: i + 1,
                    total_cycles: 5,
                }))
            );
        }).toThrowError(PaypalTSError);
    });

    // Add more test cases for other validation scenarios
});