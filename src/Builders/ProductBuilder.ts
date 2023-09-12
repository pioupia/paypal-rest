import { ProductBuilderProps, ProductCategory, ProductType } from "../types/Product";
import PaypalTSError from "../Manager/Errors";

const ALLOWED_TYPES = ['PHYSICAL', 'DIGITAL', 'SERVICE'];

export default class ProductBuilder {
    private name?: string;
    private type?: ProductType;

    private description?: string;
    private id?: string;
    private category?: ProductCategory;
    private image_url?: string;
    private home_url?: string;

    constructor(data?: Partial<ProductBuilderProps>) {
        this.name = data?.name;
        this.type = data?.type;
        this.description = data?.description;
        this.id = data?.id;
        this.category = data?.category;
        this.image_url = data?.image_url;
        this.home_url = data?.home_url;
    }

    setName(name: string): ProductBuilder {
        if (name.length < 1 || name.length > 127)
            throw new PaypalTSError("The length of the name field of a product must be between 1 and 127 characters.");

        this.name = name;
        return this;
    }

    setType(type: ProductType): ProductBuilder {
        if (!ALLOWED_TYPES.includes(type))
            throw new PaypalTSError("The type field of the product is invalid. Allowed type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'.");

        this.type = type;
        return this;
    }

    setDescription(description: string): ProductBuilder {
        if (description.length < 1 || description.length > 256)
            throw new PaypalTSError("The length of the description field of a product must be between 1 and 256 characters.");

        this.description = description;
        return this;
    }

    setID(id: string): ProductBuilder {
        if (id.length < 6 || id.length > 50)
            throw new PaypalTSError("The length of the ID field of a product must be between 6 and 50 characters.");

        this.id = id;
        return this;
    }

    setCategory(category: ProductCategory): ProductBuilder {
        if (category && (category.length < 4 || category.length > 256 || !/^[A-Z_]+$/.test(category)))
            throw new PaypalTSError("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");

        this.category = category;
        return this;
    }

    setImageUrl(image_url: string): ProductBuilder {
        if (image_url && (image_url.length < 1 || image_url.length > 2000))
            throw new PaypalTSError("The length of the image_url field of a product must be between 1 and 2000 characters.");

        this.image_url = image_url;
        return this;
    }

    setHomeUrl(home_url: string): ProductBuilder {
        if (home_url && (home_url.length < 1 || home_url.length > 256))
            throw new PaypalTSError("The length of the home_url field of a product must be between 1 and 2000 characters.");


        this.home_url = home_url;
        return this;
    }

    toJSON(): Readonly<ProductBuilderProps> {
        this.verifyData();

        const data: ProductBuilderProps = {
            name: this.name as string,
            type: this.type as ProductType
        }

        if (this.description)
            data.description = this.description;
        if (this.id)
            data.id = this.id;
        if (this.category)
            data.category = this.category;
        if (this.image_url)
            data.image_url = this.image_url;
        if (this.home_url)
            data.home_url = this.home_url;

        return Object.freeze(data);
    }

    private verifyData() {
        if (!this.name || !this.type)
            throw new PaypalTSError("The name and type field of a product are required.");

        if (this.id && (this.id.length < 6 || this.id.length > 50))
            throw new PaypalTSError("The length of the ID field of a product must be between 6 and 50 characters.");
        if (this.name && (this.name.length < 1 || this.name.length > 127))
            throw new PaypalTSError("The length of the name field of a product must be between 1 and 127 characters.");
        if (this.description && (this.description.length < 1 || this.description.length > 256))
            throw new PaypalTSError("The length of the description field of a product must be between 1 and 256 characters.");
        if (!ALLOWED_TYPES.includes(this.type))
            throw new PaypalTSError("The type field of the product is invalid. Allowed type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'.");
        if (this.category && (this.category.length < 4 || this.category.length > 256 || !/^[A-Z_]+$/.test(this.category)))
            throw new PaypalTSError("The length of the category field of a product must be between 4 and 256 characters, in uppercase.");
        if (this.image_url && (this.image_url.length < 1 || this.image_url.length > 2000))
            throw new PaypalTSError("The length of the image_url field of a product must be between 1 and 2000 characters.");
        if (this.home_url && (this.home_url.length < 1 || this.home_url.length > 256))
            throw new PaypalTSError("The length of the home_url field of a product must be between 1 and 2000 characters.");
    }
}