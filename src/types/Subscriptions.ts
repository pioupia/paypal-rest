import BillingCycleBuilder from "../Builders/BillingCycleBuilder";
import PaymentPreferencesBuilder from "../Builders/PaymentPreferencesBuilder";
import { PaymentPreferencesProps } from "./PaymentPreferences";
import { BillingCycleProps, InlineBillingCycleProps } from "./BillingCycle";
import ProductBuilder from "../Builders/ProductBuilder";
import { ProductUpdateBuilder } from "../Builders/ProductUpdateBuilder";
import { LinksData } from "./index";
import {
    PayeePreferred,
    PayPalPreferences,
    PurchaseUnitBuilderJSON,
    PurchaseUnitBuilderProps,
    UnitBuilderJSON
} from "./Order";
import UnitBuilder from "../Builders/UnitBuilder";
import SubscriptionInlinePlanBuilder from "../Builders/SubscriptionInlinePlanBuilder";

export type SubscriptionFieldResponse = 'last_failed_payment' | 'plan';

export type SubscriptionsStatus = "ACTIVE" | "INACTIVE" | "CREATED";

export interface Taxes {
    percentage: number;
    inclusive?: boolean;
}

export type JSONTaxes = Omit<Taxes, 'percentage'> & { percentage: string };

export interface SubscriptionsInlinePlanBuilderProps<T extends 'Props' | 'JSON' = 'Props'> {
    payment_preferences?: T extends 'Props' ? (PaymentPreferencesBuilder | PaymentPreferencesProps) :  PaymentPreferencesProps<T>;
    taxes?: T extends 'Props' ? Taxes : JSONTaxes;
    billing_cycles?: InlineBillingCycleProps<T>[];
}

export interface SubscriptionsPlanBuilderProps<T extends 'Props' | 'JSON' = 'Props'> extends Omit<SubscriptionsInlinePlanBuilderProps<T>, 'billing_cycles'> {
    product_id: T extends 'Props' ? string | ProductBuilder | ProductUpdateBuilder : string;
    name: string;
    billing_cycles: T extends 'Props' ? (BillingCycleBuilder | BillingCycleProps)[] : (BillingCycleProps<T>)[];
    status?: SubscriptionsStatus;
    description?: string;
    quantity_supported?: boolean;
}

export interface SubscriptionsPlanJSON {
    id: string;
    product_id: string;
    name: string;
    status: SubscriptionsStatus;
    usage_type: "LICENSED" | "UNLIMITED";
    create_time: string;
    billing_cycles?: BillingCycleProps<'JSON'>[];
    links?: LinksData[];
    update_time?: string;
    description?: string;
    quantity_supported?: boolean;
    payment_preferences?: PaymentPreferencesProps<'JSON'>;
    taxes?: JSONTaxes;
}

export interface SubscriptionsPlansListProps {
    productId?: ProductBuilder | ProductUpdateBuilder | string;
    planIds?: string | SubscriptionsPlanJSON;
    page?: number;
    pageSize?: number;
    totalRequired?: boolean;
}

export interface SubscriptionsPlansListJSON {
    plans?: SubscriptionsPlanJSON[];
    total_items?: number;
    total_pages?: number;
    links?: LinksData[];
}

export interface PaymentMethod {
    payer_selected: 'PAYPAL';
    payee_preferred: PayeePreferred;
}

export type ApplicationContext = Omit<PayPalPreferences, 'landing_page' | 'user_action' | 'payment_method_preference'> & {
    payment_method?: PaymentMethod;
    user_action?: 'CONTINUE' | 'SUBSCRIBE_NOW';
};

export interface SubscriptionsBuilderProps<T extends 'Props' | 'JSON' = 'Props'> {
    plan_id: string;
    quantity?: T extends 'Props' ? number : string;
    custom_id?: string;
    start_time?: string;
    shipping_amount?: T extends 'Props' ? (UnitBuilder | PurchaseUnitBuilderProps) : UnitBuilderJSON;
    application_context?: ApplicationContext;
    plan?: T extends 'Props' ? (SubscriptionInlinePlanBuilder | SubscriptionsInlinePlanBuilderProps<T>) : SubscriptionsInlinePlanBuilderProps<T>;
}