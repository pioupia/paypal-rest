import ProductBuilder from "./ProductBuilder";
import { GetProductDetailsJSON, ProductCategory } from "../types/Product";
import { updateProductDetails } from "../Functions/Products";
import PaypalTSError from "../Manager/Errors";

export class ProductUpdateBuilder {
    private product: ProductBuilder;
    private readonly previousProduct: Readonly<GetProductDetailsJSON>;

    constructor(data: GetProductDetailsJSON) {
        this.previousProduct = Object.freeze(data);
        this.product = new ProductBuilder(data);
    }

    setDescription(description: string) {
        this.product.setDescription(description);
        return this;
    }

    setCategory(category: ProductCategory) {
        this.product.setCategory(category);
        return this;
    }

    setImageUrl(image_url: string) {
        this.product.setImageUrl(image_url);
        return this;
    }

    setHomeUrl(home_url: string) {
        this.product.setHomeUrl(home_url);
        return this;
    }

    update(): Promise<ProductUpdateBuilder> {
        return new Promise(async (resolve, reject) => {
            if (!this.previousProduct.id)
                return reject(new PaypalTSError("The project doesn't have any ID, so it can't be updated."));

            try {
                await updateProductDetails(this.previousProduct.id, this.previousProduct, this.product.toJSON());
                return resolve(this);
            } catch (e) {
                throw e;
            }
        });
    }

    toJSON() {
        return this.product.toJSON();
    }
}