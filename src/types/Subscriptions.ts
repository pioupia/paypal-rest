import BillingCycleBuilder from "../Builders/BillingCycleBuilder";
import PaymentPreferencesBuilder from "../Builders/PaymentPreferencesBuilder";
import { PaymentPreferencesProps } from "./PaymentPreferences";
import { BillingCycleProps } from "./BillingCycle";
import ProductBuilder from "../Builders/ProductBuilder";
import { ProductUpdateBuilder } from "../Builders/ProductUpdateBuilder";
import { LinksData } from "./index";
import { ProductCategory } from "./Product";

export type SubscriptionsStatus = "ACTIVE" | "INACTIVE" | "CREATED";

export interface Taxes {
    percentage: number;
    inclusive?: boolean;
}

export type JSONTaxes = Omit<Taxes, 'percentage'> & { percentage: string };

export interface SubscriptionsPlanBuilderProps<T extends 'Props' | 'JSON' = 'Props'> {
    product_id: T extends 'Props' ? string | ProductBuilder | ProductUpdateBuilder : string;
    name: string;
    billing_cycles: T extends 'Props' ? (BillingCycleBuilder | BillingCycleProps)[] : (BillingCycleProps<T>)[];
    payment_preferences: T extends 'Props' ? (PaymentPreferencesBuilder | PaymentPreferencesProps) :  PaymentPreferencesProps<T>;
    status?: SubscriptionsStatus;
    description?: string;
    quantity_supported?: boolean;
    taxes?: T extends 'Props' ? Taxes : JSONTaxes;
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