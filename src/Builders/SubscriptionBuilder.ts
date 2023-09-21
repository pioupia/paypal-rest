import UnitBuilder from "./UnitBuilder";
import { ApplicationContext, SubscriptionsBuilderProps } from "../types/Subscriptions";
import PaypalTSError from "../Manager/Errors";
import { PurchaseUnitBuilderProps } from "../types/Order";

const ALLOWED_SHIPPING_PREFERENCE = ['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS'];
const ALLOWED_USER_ACTIONS = ['CONTINUE', 'SUBSCRIBE_NOW'];
const ALLOWED_PAYEE_PREFERRED = ['IMMEDIATE_PAYMENT_REQUIRED', 'UNRESTRICTED'];

export default class SubscriptionBuilder {
    private plan_id?: string;
    private quantity?: number;
    private custom_id?: string;
    private start_time?: string;
    private shipping_amount?: UnitBuilder;
    private application_context?: ApplicationContext;

    constructor(data?: SubscriptionsBuilderProps) {
        this.plan_id = data?.plan_id;
        this.quantity = data?.quantity;
        this.custom_id = data?.custom_id;
        this.start_time = data?.start_time;

        if (data?.shipping_amount)
            this.shipping_amount = data.shipping_amount instanceof UnitBuilder ? data.shipping_amount : new UnitBuilder(data?.shipping_amount);

        this.application_context = data?.application_context;
    }

    setPlanId(id: string) {
        if (id.length < 3 || id.length > 50)
            throw new PaypalTSError('Invalid plan ID provided. The plan ID must be between 3 and 50 characters long.');

        this.plan_id = id;
        return this;
    }

    setQuantity(quantity: number) {
        if (isNaN(quantity))
            throw new PaypalTSError('Invalid quantity provided. The quantity must be a number.');

        this.quantity = quantity;
        return this;
    }

    setCustomId(id: string) {
        if (id.length > 127)
            throw new PaypalTSError('Invalid custom ID provided. The custom ID must be between 1 and 127 characters long.');

        this.custom_id = id;
        return this;
    }

    setStartTime(time: string) {
        if (time && !/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/.test(time))
            throw new PaypalTSError('Invalid start time provided. The start time must be a valid ISO-8601 format.');

        this.start_time = time;
        return this;
    }

    setShippingAmount(amount: UnitBuilder | PurchaseUnitBuilderProps) {
        this.shipping_amount = amount instanceof UnitBuilder ? amount : new UnitBuilder(amount);
        return this;
    }

    setApplicationContext(context: ApplicationContext) {
        this.verifyApplicationContextValues(context);
        this.application_context = context;
        return this;
    }

    toJSON(): Readonly<SubscriptionsBuilderProps<'JSON'>> {
        this.validate();

        return Object.freeze({
            plan_id: this.plan_id!,
            quantity: this.quantity,
            custom_id: this.custom_id,
            start_time: this.start_time,
            shipping_amount: this.shipping_amount?.toJSON(),
            application_context: this.application_context
        });
    }

    private validate() {
        if (!this.plan_id || this.plan_id.length < 3 || this.plan_id.length > 50)
            throw new PaypalTSError("Invalid plan ID provided. The plan ID must be between 3 and 50 characters long.");

        if (this.quantity && isNaN(this.quantity))
            throw new PaypalTSError("Invalid quantity provided. The quantity must be a number.");

        if (this.custom_id && this.custom_id.length > 127)
            throw new PaypalTSError("Invalid custom ID provided. The custom ID must be between 1 and 127 characters long.");

        if (this.start_time && !/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/.test(this.start_time))
            throw new PaypalTSError("Invalid start time provided. The start time must be a valid ISO-8601 format.");

        if (this.application_context)
            this.verifyApplicationContextValues(this.application_context);

        this.shipping_amount?.toJSON();
    }

    private verifyApplicationContextValues(context: ApplicationContext) {
        if (context.brand_name && context.brand_name.length > 127)
            throw new PaypalTSError('Invalid brand name provided. The brand name must be between 1 and 127 characters long.');
        if (context.shipping_preference && !ALLOWED_SHIPPING_PREFERENCE.includes(context.shipping_preference))
            throw new PaypalTSError('Invalid shipping preference provided. The shipping preference must be one of the following: ' + ALLOWED_SHIPPING_PREFERENCE.join(', '));
        if (context.user_action && !ALLOWED_USER_ACTIONS.includes(context.user_action))
            throw new PaypalTSError('Invalid user action provided. The user action must be one of the following: ' + ALLOWED_USER_ACTIONS.join(', '));
        if (context.locale &&
            (
                context.locale.length > 10 ||
                context.locale.length < 2 ||
                !/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$/.test(context.locale)
            )
        )
            throw new PaypalTSError('Invalid locale provided. The locale must be a valid BCP-47 language tag.');

        if (context.payment_method?.payer_selected && context.payment_method.payer_selected !== 'PAYPAL')
            throw new PaypalTSError('Invalid payer selected provided. The payer selected must be PAYPAL.');
        if (context.payment_method?.payee_preferred && !ALLOWED_PAYEE_PREFERRED.includes(context.payment_method.payee_preferred))
            throw new PaypalTSError('Invalid payee preferred provided. The payee preferred must be one of the following: ' + ALLOWED_PAYEE_PREFERRED.join(', '));
    }
}