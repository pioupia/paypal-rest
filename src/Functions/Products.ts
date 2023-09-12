import PaypalTSError from "../Manager/Errors";
import requestManager from "../Manager/RequestManager";
import ProductBuilder from "../Builders/ProductBuilder";

export function createProduct(product: ProductBuilder) {
    return new Promise(async (resolve) => {
       try {
           const json = await requestManager('v1/catalogs/products', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(product)
           });
           return resolve(json);
       } catch (e) {
           throw new PaypalTSError("An error has occurred during the auth with PayPal. Error:" + e);
       }
    });
}