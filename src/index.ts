import auth from './Manager/AuthManager';
import config from './Manager/ConfigManager';
import { captureOrder, order as createOrder } from "./Manager/OrderManager";
import PurchaseUnitBuilder from "./Builders/PurchaseUnitBuilder";
import ItemsBuilder from './Builders/ItemsBuilder';
import UnitBuilder from './Builders/UnitBuilder';
import { CurrencyCodes } from './types/Order';


export {
    config,
    auth,
    PurchaseUnitBuilder, UnitBuilder, ItemsBuilder,
    CurrencyCodes
}

export const order = {
    create: createOrder,
    capture: captureOrder
}