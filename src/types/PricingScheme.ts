import UnitBuilder from "../Builders/UnitBuilder";
import { PurchaseUnitBuilderProps, UnitBuilderJSON } from "./Order";

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
    fixed_price?: UnitBuilder | PurchaseUnitBuilderProps;
    tiers?: PricingSchemeTiers[];
}

export interface PricingSchemeJSON {
    pricing_model?: PricingModel;
    fixed_price?: UnitBuilderJSON;
    tiers?: PricingSchemeTiersJSON[];
}