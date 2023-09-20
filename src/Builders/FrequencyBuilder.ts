import { FrequencyBuilderJSON, FrequencyBuilderProps, IntervalUnit, MaxIntervalUnit } from "../types/Frequency";
import PaypalTSError from "../Manager/Errors";

const ALLOWED_INTERVAL_UNITS = ['DAY', 'WEEK', 'MONTH', 'YEAR'];

export default class FrequencyBuilder {
    private interval_unit?: IntervalUnit;
    private interval_count?: number;

    constructor(data?: FrequencyBuilderProps) {
        if (data) {
            this.interval_unit = data.interval_unit;
            this.interval_count = data.interval_count;
        }
    }

    setIntervalUnit(interval: IntervalUnit): FrequencyBuilder {
        if (!ALLOWED_INTERVAL_UNITS.includes(interval))
            throw new PaypalTSError("Invalid interval unit. Allowed values are DAY, WEEK, MONTH, YEAR.");
        if (this.interval_count && this.interval_count > MaxIntervalUnit[interval])
            throw new PaypalTSError(`Invalid interval count. Max interval count for ${interval} is ${MaxIntervalUnit[interval as IntervalUnit]}.`);

        this.interval_unit = interval;
        return this;
    }

    setIntervalCount(count: number): FrequencyBuilder {
        if (count > (MaxIntervalUnit[this.interval_unit as IntervalUnit] || 365))
            throw new PaypalTSError(`Invalid interval count. Max interval count for ${this.interval_unit} is ${MaxIntervalUnit[this.interval_unit as IntervalUnit]}.`);

        this.interval_count = count;
        return this;
    }

    toJSON(): Readonly<FrequencyBuilderJSON> {
        this.verifyData();

        return Object.freeze({
            interval_unit: this.interval_unit as IntervalUnit,
            interval_count: this.interval_count
        });
    }

    verifyData(): void {
        if (!this.interval_unit)
            throw new PaypalTSError("Interval unit is required.");

        if (this.interval_count && this.interval_count > MaxIntervalUnit[this.interval_unit])
            throw new PaypalTSError(`Invalid interval count. Max interval count for ${this.interval_unit} is ${MaxIntervalUnit[this.interval_unit]}.`);
    }
}