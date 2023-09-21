import BillingCycleBuilder from "../Builders/BillingCycleBuilder";
import PaymentPreferencesBuilder from "../Builders/PaymentPreferencesBuilder";
import { PaymentPreferencesProps } from "./PaymentPreferences";
import { BillingCycleProps } from "./BillingCycle";
import ProductBuilder from "../Builders/ProductBuilder";

export type SubscriptionsStatus = "ACTIVE" | "INACTIVE" | "CREATED";

export interface Taxes {
    percentage: number;
    inclusive?: boolean;
}

export type JSONTaxes = Omit<Taxes, 'percentage'> & { percentage: string };

export interface SubscriptionsBuilderProps<T extends 'Props' | 'JSON' = 'Props'> {
    product_id: T extends 'Props' ? string | ProductBuilder : string;
    name: string;
    billing_cycles: T extends 'Props' ? (BillingCycleBuilder | BillingCycleProps)[] : (BillingCycleProps<T>)[];
    payment_preferences: T extends 'Props' ? (PaymentPreferencesBuilder | PaymentPreferencesProps) :  PaymentPreferencesProps<T>;
    status?: SubscriptionsStatus;
    description?: string;
    quantity_supported?: boolean;
    taxes?: T extends 'Props' ? Taxes : JSONTaxes;
}