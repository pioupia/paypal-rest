import { OrderManagerResponse, OrderProps } from "../types/Order";
import { getConfig } from "./ConfigManager";
import PaypalTSError, { configError } from "./Errors";

export function order({ purchase_units, intent = 'CAPTURE', paypal }: OrderProps): Promise<OrderManagerResponse> {
    return new Promise(async (resolve) => {
        const { base_url, access_token } = getConfig();

        if (!access_token)
            return configError();

        const url = base_url + 'v2/checkout/orders';
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
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + access_token,
                },
                method: "POST",
                body: JSON.stringify(payload),
            });

            const json: OrderManagerResponse = await response.json();
            return resolve(json);
        } catch(e) {
            throw new PaypalTSError("An error has occurred during the order creation. Error: " + e);
        }
    });
}