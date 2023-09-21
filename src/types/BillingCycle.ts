import PricingSchemeBuilder from "../Builders/PricingSchemeBuilder";
import FrequencyBuilder from "../Builders/FrequencyBuilder";
import { FrequencyBuilderJSON, FrequencyBuilderProps } from "./Frequency";
import { PricingSchemeBuilderProps, PricingSchemeJSON } from "./PricingScheme";

export type BillingCycleTenureType = 'REGULAR' | 'TRIAL';

export interface BillingCycleProps<T extends 'Props' | 'JSON' = 'Props'> {
    tenure_type: BillingCycleTenureType;
    frequency: T extends 'Props' ? (FrequencyBuilder | FrequencyBuilderProps) : FrequencyBuilderJSON;
    sequence: number;
    total_cycles?: number;
    pricing_scheme?: T extends 'Props' ? (PricingSchemeBuilder | PricingSchemeBuilderProps) : PricingSchemeJSON;
}