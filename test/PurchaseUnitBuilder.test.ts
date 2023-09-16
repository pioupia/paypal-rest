import { ItemsBuilder, PurchaseUnitBuilder } from "../src";
import { deepEqual } from "node:assert";

describe('PurchaseUnitBuilder errors', () => {
    it('description', () => {
        expect(() => {
            new PurchaseUnitBuilder()
                .setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor imperdiet accumsan. Integer lacinia mauris vel viverra..')
        }).toThrow("The length of a purchase unit description must be between 1 and 127 characters.")
    });

    it('reference ID', () => {
        expect(() => {
            new PurchaseUnitBuilder()
                .setReferenceID('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor convallis neque id tincidunt. Nullam rutrum sollicitudin dui quis ornare. Donec lobortis commodo sagittis. Suspendisse eget tincidunt ante, at semper arcu. Etiam vehicula libero vel sit..')
        }).toThrow("The length of the reference ID must be between 1 and 256 characters.")
    });
});

describe('PurchaseUnitBuilder values', () => {
    const { description, reference_id, items, amount } = new PurchaseUnitBuilder()
        .setDescription('test description')
        .setPrice(12)
        .setCurrency('EUR')
        .setReferenceID('ref ID')
        .setItems(
            new ItemsBuilder()
                .setName('test')
                .setQuantity(1)
                .setUnitAmount({
                    value: 10,
                    currency_code: 'EUR'
                }),
            new ItemsBuilder()
                .setName('test')
                .setQuantity(1)
                .setUnitAmount({
                    value: 23,
                    currency_code: 'EUR'
                })
        )
        .addItems(
            new ItemsBuilder()
                .setName('test')
                .setQuantity(10)
                .setUnitAmount({
                    value: 3.5,
                    currency_code: 'EUR'
                })
        )
        .toJSON();

    it('description', () => {
        expect(description).toBe('test description');
    });

    it('reference ID', () => {
        expect(reference_id).toBe('ref ID');
    });

    it('items', () => {
        deepEqual(items, [
            {
                "name": "test",
                "quantity": "1",
                "unit_amount": {
                    "currency_code": "EUR",
                    "value": "10"
                }
            },
            {
                "name": "test",
                "quantity": "1",
                "unit_amount": {
                    "currency_code": "EUR",
                    "value": "23"
                }
            },
            {
                "name": "test", "quantity": "10", "unit_amount": {
                    "currency_code": "EUR",
                    "value": "3.5"
                }
            }
        ]);
    });

    it('price', () => {
        expect(amount.value).toBe("12");
    });

    it('currency', () => {
        expect(amount.currency_code).toBe('EUR');
    });

    it('breakdown', () => {
        expect(amount.breakdown?.item_total?.value).toBe((10 + 23 + 10 * 3.5).toString());
        expect(amount.breakdown?.item_total?.currency_code).toBe('EUR');
    });

    it('only required field are fill', () => {
        const pub = new PurchaseUnitBuilder({
            currency_code: 'EUR',
            value: 12
        }).toJSON();

        deepEqual(pub, {
            amount: {
                currency_code: 'EUR',
                value: 12
            }
        })
    })
});