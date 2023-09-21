import auth from './Functions/Auth';
import config from './Functions/Config';
import { captureOrder, order as createOrder } from "./Functions/Order";
import PurchaseUnitBuilder from "./Builders/PurchaseUnitBuilder";
import ItemsBuilder from './Builders/ItemsBuilder';
import UnitBuilder from './Builders/UnitBuilder';
import { CurrencyCodes } from './types/Order';
import ProductBuilder from './Builders/ProductBuilder';
import { createProduct, getProductDetails, getProducts, updateProductDetails } from "./Functions/Products";
import SubscriptionBuilder from './Builders/SubscriptionBuilder';
import BillingCycleBuilder from './Builders/BillingCycleBuilder';
import PaymentPreferencesBuilder from './Builders/PaymentPreferencesBuilder';
import { createSubscription } from "./Functions/Subscriptions";


export {
    config,
    auth,
    PurchaseUnitBuilder, UnitBuilder,
    ItemsBuilder, ProductBuilder,
    CurrencyCodes, SubscriptionBuilder,
    BillingCycleBuilder, PaymentPreferencesBuilder
};

export const order = {
    create: createOrder,
    capture: captureOrder
};

export const product = {
    create: createProduct,
    list: getProducts,
    get: getProductDetails,
    update: updateProductDetails
};

export const subscription = {
    create: createSubscription,
}