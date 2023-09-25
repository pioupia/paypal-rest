import {
    SubscriptionFieldResponse,
    SubscriptionsBuilderProps,
    SubscriptionsPlanBuilderProps,
    SubscriptionsPlanJSON, SubscriptionsPlansListJSON,
    SubscriptionsPlansListProps
} from "../types/Subscriptions";
import requestManager from "../Manager/RequestManager";
import PaypalTSError from "../Manager/Errors";
import SubscriptionBuilder from "../Builders/SubscriptionBuilder";

export function createSubscriptionPlan(subscription: SubscriptionsPlanBuilderProps<'JSON'>): Promise<SubscriptionsPlanJSON> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await requestManager('v1/billing/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            });
            return resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

export function listSubscriptionPlan(params?: Partial<SubscriptionsPlansListProps>): Promise<SubscriptionsPlansListJSON> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await requestManager('v1/billing/plans', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: {
                    product_id: typeof params?.productId === 'string' ? params.productId : params?.productId?.toJSON().id,
                    plan_ids: typeof params?.planIds === 'string' ? params.planIds : params?.planIds?.id,
                    page: params?.page,
                    page_size: params?.pageSize,
                    total_required: params?.totalRequired
                }
            });
            return resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

export function getSubscriptionPlan(id: string): Promise<SubscriptionsPlanJSON> {
    return new Promise(async (resolve, reject) => {
        if (!id)
            throw new PaypalTSError('Invalid subscription plan ID provided.');

        try {
            const res = await requestManager('v1/billing/plans/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

export function createSubscription(subscription: SubscriptionsBuilderProps<'JSON'> | SubscriptionBuilder): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (subscription instanceof SubscriptionBuilder)
            subscription = subscription.toJSON();

        try {
            const res = await requestManager('v1/billing/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            });
            return resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

export function getSubscription(subscriptionId: string, fields?: SubscriptionFieldResponse): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (typeof subscriptionId !== 'string')
            throw new PaypalTSError('Invalid subscription ID provided.');
        if (fields && fields !== 'last_failed_payment' && fields !== 'plan')
            throw new PaypalTSError('Invalid fields provided. Allowed values: last_failed_payment, plan');

        try {
            const res = await requestManager('v1/billing/subscriptions/' + subscriptionId + (fields ? '?fields=' + fields : ''), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}