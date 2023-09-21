import { BillingCycleProps, BillingCycleTenureType } from "../types/BillingCycle";
import FrequencyBuilder from "./FrequencyBuilder";
import PricingSchemeBuilder from "./PricingSchemeBuilder";
import PaypalTSError from "../Manager/Errors";
import { FrequencyBuilderProps } from "../types/Frequency";
import { PricingSchemeBuilderProps } from "../types/PricingScheme";

const ALLOWS_TENURE_TYPE = ['REGULAR', 'TRIAL'];

export default class BillingCycleBuilder {
    private tenure_type?: BillingCycleTenureType;
    private frequency: FrequencyBuilder;
    private sequence?: number;
    private total_cycles?: number;
    private pricing_scheme?: PricingSchemeBuilder;

    constructor(data?: Partial<BillingCycleProps>) {
        this.tenure_type = data?.tenure_type;
        this.frequency = !(data?.frequency instanceof FrequencyBuilder) ? new FrequencyBuilder(data?.frequency) : data.frequency;
        this.sequence = data?.sequence;
        this.total_cycles = data?.total_cycles;
        this.pricing_scheme = !(data?.pricing_scheme instanceof PricingSchemeBuilder) ? new PricingSchemeBuilder(data?.pricing_scheme) : data?.pricing_scheme;
    }

    setTenureType(tenure_type: BillingCycleTenureType) {
        if (!ALLOWS_TENURE_TYPE.includes(tenure_type))
            throw new PaypalTSError(`Invalid tenure_type: ${tenure_type}. Allowed values: ${ALLOWS_TENURE_TYPE.join(', ')}`);

        this.tenure_type = tenure_type;
        return this;
    }

    setFrequency(frequency: FrequencyBuilder | FrequencyBuilderProps) {
        if (!(frequency instanceof FrequencyBuilder))
            frequency = new FrequencyBuilder(frequency);

        this.frequency = frequency;
        return this;
    }

    setSequence(sequence: number) {
        if (sequence < 1 || sequence > 99)
            throw new PaypalTSError(`Invalid sequence: ${sequence}. Allowed values: 1-99.`);

        this.sequence = sequence;
        return this;
    }

    setTotalCycles(total_cycles: number) {
        if (total_cycles < 0 || total_cycles > 999)
            throw new PaypalTSError(`Invalid total_cycles: ${total_cycles}. Allowed values: 1-999.`);

        this.total_cycles = total_cycles;
        return this;
    }

    setPricingScheme(pricing_scheme: PricingSchemeBuilder | PricingSchemeBuilderProps) {
        if (!(pricing_scheme instanceof PricingSchemeBuilder))
            pricing_scheme = new PricingSchemeBuilder(pricing_scheme);

        this.pricing_scheme = pricing_scheme;
        return this;
    }

    toJSON(): Readonly<BillingCycleProps<'JSON'>> {
        this.verifyData();

        return {
            tenure_type: this.tenure_type as BillingCycleTenureType,
            frequency: this.frequency.toJSON(),
            sequence: this.sequence as number,
            total_cycles: this.total_cycles,
            pricing_scheme: this.pricing_scheme?.toJSON()
        }
    }

    private verifyData() {
        if (!ALLOWS_TENURE_TYPE.includes(this.tenure_type || ''))
            throw new PaypalTSError(`Invalid tenure_type: ${this.tenure_type}. Allowed values: ${ALLOWS_TENURE_TYPE.join(', ')}`);
        if (!this.sequence || this.sequence < 1 || this.sequence > 99)
            throw new PaypalTSError(`Invalid sequence: ${this.sequence}. Allowed values: 1-99.`);
        if (typeof this.total_cycles === 'number' && (this.total_cycles < 0 || this.total_cycles > 999))
            throw new PaypalTSError(`Invalid total_cycles: ${this.total_cycles}. Allowed values: 1-999.`);

        this.frequency.toJSON();
        this.pricing_scheme?.toJSON();
    }
}