import PaypalTSError from "../Manager/Errors";
import requestManager from "../Manager/RequestManager";
import ProductBuilder from "../Builders/ProductBuilder";
import { GetProductDetailsJSON, GetProductListJSON, GetProductListProps } from "../types/Product";

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
           throw new PaypalTSError("An error has occurred during the product creation with PayPal. Error:" + e);
       }
    });
}

export function getProducts({ total_required, page, page_size }: Partial<GetProductListProps>): Promise<GetProductListJSON> {
    return new Promise(async (resolve) => {
        page_size ||= 10;
        page ||= 1;
        total_required ||= false;

        if (typeof total_required !== "boolean")
            throw new PaypalTSError("The total_required value should be a boolean.");
        if (typeof page !== 'number' || isNaN(page) || page < 1 || page > 100_000 || page % 1 !== 0)
            throw new PaypalTSError("The page value should be a positive number between 1 and 100_000.");
        if (typeof page_size !== 'number' || isNaN(page_size) || page_size < 1 || page_size > 20 || page_size % 1 !== 0)
            throw new PaypalTSError("The page_size value should be a whole positive number between 1 and 20.");

        try {
            return resolve(
                await requestManager(`v1/catalogs/products?page_size=${page_size}&page=${page}&total_required=${total_required}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            )
        } catch (e) {
            throw new PaypalTSError("An error has occurred during the product listing with PayPal. Error:" + e);
        }
    });
}

export function getProductDetails(productId: string): Promise<GetProductDetailsJSON> {
    return new Promise(async (resolve) => {
        if (typeof productId !== "string" || !productId)
            throw new PaypalTSError("The string productId parameter is required to get the details of a product.");

        try {
            return resolve(
                await requestManager(`v1/catalogs/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            )
        } catch (e) {
            throw new PaypalTSError("An error has occurred during the product listing with PayPal. Error:" + e);
        }
    });
}