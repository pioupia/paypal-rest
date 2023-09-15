import { OrderManagerResponse, OrderProps } from "../types/Order";
import PaypalTSError from "../Manager/Errors";
import requestManager from "../Manager/RequestManager";

export function order({ purchase_units, intent = 'CAPTURE', paypal }: OrderProps): Promise<OrderManagerResponse> {
    return new Promise(async (resolve, reject) => {
        if (!purchase_units.length || purchase_units.length > 10)
            return reject(new PaypalTSError("You should have between 1 and 10 purchase units."));

        const payload = {
            intent: intent || 'CAPTURE',
            purchase_units: purchase_units.map(p => p.toJSON()),
            payment_source: {
                paypal: {
                    experience_context: paypal
                }
            }
        };

        try {
            const json: OrderManagerResponse = await requestManager(`v2/checkout/orders`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            return resolve(json);
        } catch(e) {
            throw new PaypalTSError("An error has occurred during the order creation. Error: " + e);
        }
    });
}

export function captureOrder(id: string) {
    return new Promise(async (resolve) => {
        try {
            const json = await requestManager(`v2/checkout/orders/${id}/capture`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return resolve(json);
        } catch (e) {
            throw new PaypalTSError("An error has occurred during the order capture. Error: " + e);
        }
    });
}