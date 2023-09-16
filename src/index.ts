import auth from './Functions/Auth';
import config from './Functions/Config';
import { captureOrder, order as createOrder } from "./Functions/Order";
import PurchaseUnitBuilder from "./Builders/PurchaseUnitBuilder";
import ItemsBuilder from './Builders/ItemsBuilder';
import UnitBuilder from './Builders/UnitBuilder';
import { CurrencyCodes } from './types/Order';
import ProductBuilder from './Builders/ProductBuilder';
import { createProduct, getProducts } from "./Functions/Products";


export {
    config,
    auth,
    PurchaseUnitBuilder, UnitBuilder,
    ItemsBuilder, ProductBuilder,
    CurrencyCodes
};

export const order = {
    create: createOrder,
    capture: captureOrder
};

export const product = {
    create: createProduct,
    list: getProducts,
};