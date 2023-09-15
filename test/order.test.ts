import { order, PurchaseUnitBuilder } from "../src";

describe('testOrder', () => {
    it('too many order', async () => {
        const unitBuilder = new PurchaseUnitBuilder()
            .setPrice(10)
            .setCurrency('EUR');

        await expect(order.create({
            purchase_units: new Array(11).fill(unitBuilder)
        })).rejects.toThrow("You should have between 1 and 10 purchase units.");
    });

    it('not enough order', async () => {
        await expect(order.create({
            purchase_units: []
        })).rejects.toThrow("You should have between 1 and 10 purchase units.");
    });
});