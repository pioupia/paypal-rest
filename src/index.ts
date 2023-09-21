import auth from './Functions/Auth';
import config from './Functions/Config';
import { captureOrder, order as createOrder } from "./Functions/Order";
import PurchaseUnitBuilder from "./Builders/PurchaseUnitBuilder";
import ItemsBuilder from './Builders/ItemsBuilder';
import UnitBuilder from './Builders/UnitBuilder';
import { CurrencyCodes } from './types/Order';
import ProductBuilder from './Builders/ProductBuilder';
import { createProduct, getProductDetails, getProducts, updateProductDetails } from "./Functions/Products";
import SubscriptionPlanBuilder from './Builders/SubscriptionPlanBuilder';
import BillingCycleBuilder from './Builders/BillingCycleBuilder';
import PaymentPreferencesBuilder from './Builders/PaymentPreferencesBuilder';
import { createSubscriptionPlan } from "./Functions/Subscriptions";


export {
    config,
    auth,
    PurchaseUnitBuilder, UnitBuilder,
    ItemsBuilder, ProductBuilder,
    CurrencyCodes, SubscriptionPlanBuilder,
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

export const plan = {
    create: createSubscriptionPlan,
}