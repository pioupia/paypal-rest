export type IntervalUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
export enum MaxIntervalUnit {
    DAY = 365,
    WEEK = 52,
    MONTH = 12,
    YEAR = 1
}

export interface FrequencyBuilderProps {
    interval_unit: IntervalUnit;
    interval_count?: number;
}

export interface FrequencyBuilderJSON {
    interval_unit: IntervalUnit;
    interval_count?: number;
}