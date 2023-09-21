import UnitBuilder from "../Builders/UnitBuilder";
import { UnitBuilderJSON } from "./Order";

export type PricingModel = "TIERED" | "VOLUME";
export interface PricingSchemeTiers {
    amount: UnitBuilder;
    starting_quantity: number;
    ending_quantity?: number;
}

export interface PricingSchemeTiersJSON {
    amount: UnitBuilderJSON;
    starting_quantity: number;
    ending_quantity?: number;
}

export interface PricingSchemeBuilderProps {
    pricing_model?: PricingModel;
    fixed_price?: UnitBuilder;
    tiers?: PricingSchemeTiers[];
}

export interface PricingSchemeJSON {
    pricing_model?: PricingModel;
    fixed_price?: UnitBuilderJSON;
    tiers?: PricingSchemeTiersJSON[];
}