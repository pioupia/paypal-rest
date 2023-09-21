import { SubscriptionsBuilderProps, SubscriptionsJSON } from "../types/Subscriptions";
import requestManager from "../Manager/RequestManager";

export function createSubscriptionPlan(subscription: SubscriptionsBuilderProps<'JSON'>): Promise<SubscriptionsJSON> {
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