import { PaymentPreferencesFeeFailureAction, PaymentPreferencesProps } from "../types/PaymentPreferences";
import UnitBuilder from "./UnitBuilder";
import PaypalTSError from "../Manager/Errors";
import { PurchaseUnitBuilderProps } from "../types/Order";

const ALLOWS_FEE_FAILURE_ACTION = ['CONTINUE', 'CANCEL'];

export default class PaymentPreferencesBuilder {
    private auto_bill_outstanding?: boolean;
    private setup_fee_failure_action?: PaymentPreferencesFeeFailureAction;
    private payment_failure_threshold?: number;
    private setup_fee?: UnitBuilder;

    constructor(data?: PaymentPreferencesProps) {
        this.auto_bill_outstanding = data?.auto_bill_outstanding;
        this.setup_fee_failure_action = data?.setup_fee_failure_action;
        this.payment_failure_threshold = data?.payment_failure_threshold;
        this.setup_fee = !(data?.setup_fee instanceof UnitBuilder) ? new UnitBuilder(data?.setup_fee) : data.setup_fee;
    }

    setAutoBillOutstanding(auto_bill_outstanding: boolean) {
        this.auto_bill_outstanding = auto_bill_outstanding;
        return this;
    }

    setSetupFeeFailureAction(setup_fee_failure_action: PaymentPreferencesFeeFailureAction) {
        if (!ALLOWS_FEE_FAILURE_ACTION.includes(setup_fee_failure_action))
            throw new PaypalTSError(`setup_fee_failure_action must be one of ${ALLOWS_FEE_FAILURE_ACTION.join(', ')}.`);

        this.setup_fee_failure_action = setup_fee_failure_action;
        return this;
    }

    setPaymentFailureThreshold(payment_failure_threshold: number) {
        if (payment_failure_threshold < 0 || payment_failure_threshold > 999)
            throw new PaypalTSError('payment_failure_threshold must be between 0 and 999.');

        this.payment_failure_threshold = payment_failure_threshold;
        return this;
    }

    setSetupFee(setup_fee: UnitBuilder | PurchaseUnitBuilderProps) {
        this.setup_fee = !(setup_fee instanceof UnitBuilder) ? new UnitBuilder(setup_fee) : setup_fee;
        return this;
    }

    toJSON(): Readonly<PaymentPreferencesProps<'JSON'>> {
        this.verifyData();

        return Object.freeze({
            auto_bill_outstanding: this.auto_bill_outstanding,
            setup_fee_failure_action: this.setup_fee_failure_action,
            payment_failure_threshold: this.payment_failure_threshold,
            setup_fee: this.setup_fee?.toJSON()
        });
    }

    private verifyData() {
        if (this.setup_fee_failure_action && !ALLOWS_FEE_FAILURE_ACTION.includes(this.setup_fee_failure_action))
            throw new PaypalTSError(`setup_fee_failure_action must be one of ${ALLOWS_FEE_FAILURE_ACTION.join(', ')}.`);

        if (this.payment_failure_threshold && (this.payment_failure_threshold < 0 || this.payment_failure_threshold > 999))
            throw new PaypalTSError('payment_failure_threshold must be between 0 and 999.');

        this.setup_fee?.toJSON();
    }
}