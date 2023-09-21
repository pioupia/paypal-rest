import UnitBuilder from "../Builders/UnitBuilder";
import { PurchaseUnitBuilderProps, UnitBuilderJSON } from "./Order";

export type PaymentPreferencesFeeFailureAction = "CONTINUE" | "CANCEL";

export interface PaymentPreferencesProps<T extends 'Props' | 'JSON' = 'Props'> {
    auto_bill_outstanding?: boolean;
    setup_fee_failure_action?: PaymentPreferencesFeeFailureAction;
    payment_failure_threshold?: number;
    setup_fee?: T extends 'Props' ? (UnitBuilder | PurchaseUnitBuilderProps) : UnitBuilderJSON;
}