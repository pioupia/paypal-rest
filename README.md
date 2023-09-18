# PayPal-REST
PayPal-REST is an unofficial implementation of the PayPal Rest API. This npm package is here to simplify the usage of this API.

> **Warning**:
> For the moment, this package is in ALPHA, so it contains very few of the PayPal API functionalities, and has not yet been fully designed for professional use. You are therefore taking a risk by installing and using this package.
> Avoid using it in production!


## Installation
You have to use your favorite package manager like [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/) to install `paypal-rest`.

```shell
npm i paypal-rest@latest
```

```shell
pnpm add paypal-rest@latest
```

```shell
yarn add paypal-rest@latest
```

## Some Examples:
### Authentication:
```ts
import { config, auth } from 'paypal-rest';

config({
    client_id: '', // your PayPal CLIENT_ID
    client_secret: '', // your PayPal SECRET
    mode: 'sandbox', // 'sandbox' | 'live' ; default: sandbox
    auto_renew: false // Let or not the package reconnect you
});

await auth().catch(console.error);
```

#### Where I can obtain my credentials?
You can get your CLIENT_ID and your CLIENT_SECRET by following [these task on the PayPal Docs](https://developer.paypal.com/api/rest/#link-getclientidandclientsecret):
1. Select [**Log in to Dashboard**](https://developer.paypal.com/dashboard/) and log in or sign up.
2. Select **Apps & Credentials**.
3. New accounts come with a **Default Application** in the **REST API apps** section. To create a new project, select **Create App**.
4. Copy the client ID and client secret for your app.

### Products:
Create, list, get details and update products!
```ts
import { product, ProductBuilder } from 'paypal-rest';

const newProduct = await product.create(
    new ProductBuilder()
        .setName('paypal-rest')
        .setType('DIGITAL')
        .setDescription('Buy me a coffee')
        .setHomeUrl('https://paypal.me/pioupia')
);

const listProduct = await product.list();
const paypalRestProduct = await product.get(listProduct.products?.[0].id!);

await paypalRestProduct
    .setDescription("Yes, I'll")
    .update();
```

### Order:

```ts
import { order, ItemsBuilder, PurchaseUnitBuilder, CurrencyCodes } from 'paypal-rest';

// Create an item
const item = new ItemsBuilder()
            .setName('coffee')
            .setQuantity(1)
            .setUnitAmount({
                currency_code: CurrencyCodes.UnitedStatesDollar, // or, you can just type 'USD'
                value: 1
            });

// Create a purchase unit
const purchaseUnit = new PurchaseUnitBuilder()
    .setCurrency('USD')
    .setPrice(1)
    .setDescription("A coffee")
    .addItems(item);

// Create the order
const res = await order.create({
    purchase_units: [purchaseUnit]
}).catch(console.error);

// And then, when you have to capture this order:
await order.capture(res.id);
```