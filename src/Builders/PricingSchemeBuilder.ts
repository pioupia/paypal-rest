import { PricingModel, PricingSchemeBuilderProps, PricingSchemeJSON, PricingSchemeTiers } from "../types/PricingScheme";
import UnitBuilder from "./UnitBuilder";
import PaypalTSError from "../Manager/Errors";
import { Amount } from "../types/Order";

const ALLOWED_PRICING_MODELS: PricingModel[] = ["TIERED", "VOLUME"];

export default class PricingSchemeBuilder {
    private pricing_model?: PricingModel;
    private fixed_price?: UnitBuilder;
    private tiers: PricingSchemeTiers[];

    constructor(data?: PricingSchemeBuilderProps) {
        this.pricing_model = data?.pricing_model;
        this.fixed_price = data?.fixed_price || new UnitBuilder();
        this.tiers = data?.tiers || [];
    }

    setPriceModel(pricing_model: PricingModel) {
        if (!ALLOWED_PRICING_MODELS.includes(pricing_model))
            throw new PaypalTSError(`Invalid pricing model: ${pricing_model}. Allowed values: ${ALLOWED_PRICING_MODELS.join(", ")}`);

        this.pricing_model = pricing_model;
        return this;
    }

    setFixedPrice(fixed_price: UnitBuilder | Amount) {
        if (fixed_price instanceof UnitBuilder)
            this.fixed_price = fixed_price;
        else
            this.fixed_price = new UnitBuilder(fixed_price);

        return this;
    }

    addTiers(...tiers: PricingSchemeTiers[]) {
        if (this.tiers.length + tiers.length > 32)
            throw new PaypalTSError("You can only have up to 32 tiers in a pricing scheme.");

        this.tiers.push(...tiers);
        return this;
    }

    setTiers(...tiers: PricingSchemeTiers[]) {
        if (tiers.length > 32)
            throw new PaypalTSError("You can only have up to 32 tiers in a pricing scheme.");

        this.tiers = tiers;
        return this;
    }

    toJSON(): Readonly<PricingSchemeJSON> {
        this.verifyData();

        return Object.freeze({
            pricing_model: this.pricing_model,
            fixed_price: this.fixed_price?.toJSON(),
            tiers: this.tiers.map(tier => ({
                ...tier,
                amount: tier.amount.toJSON()
            }))
        });
    }

    private verifyData() {
        if (this.pricing_model && !ALLOWED_PRICING_MODELS.includes(this.pricing_model))
            throw new PaypalTSError(`Invalid pricing model: ${this.pricing_model}. Allowed values: ${ALLOWED_PRICING_MODELS.join(", ")}`);

        if (this.pricing_model === "TIERED" && !this.tiers.length)
            throw new PaypalTSError("Tiers are required for tiered pricing model.");

        if (this.tiers && this.tiers.length > 32)
            throw new PaypalTSError("You can only have up to 32 tiers in a pricing scheme.");

        if (this.fixed_price)
            this.fixed_price.toJSON();
    }
}