import { ItemsBuilder } from "../src";
import { deepEqual } from "node:assert";
import { CategoryType } from "../src/types/Order";

describe("ItemBuilder errors tests", () => {
    it("name", () => {
        expect(() => {
            new ItemsBuilder()
                .setName("")
        }).toThrow("The length of the name must be between 1 and 127 characters.");

        expect(() => {
            new ItemsBuilder()
                .setName("This is long long text, as long as possible to ensure that the builder sends an error if the title is longer than 127 characters")
        }).toThrow("The length of the name must be between 1 and 127 characters.");
    });

    it("quantity", () => {
        expect(() => {
            new ItemsBuilder()
                .setQuantity(-1)
        }).toThrow("The quantity cannot exceed 10 digits and must be a whole number.");

        expect(() => {
            new ItemsBuilder()
                .setQuantity(10000000000)
        }).toThrow("The quantity cannot exceed 10 digits and must be a whole number.");

        expect(() => {
            new ItemsBuilder()
                .setQuantity(1.5)
        }).toThrow("The quantity cannot exceed 10 digits and must be a whole number.");
    });

    it("description", () => {
        expect(() => {
            new ItemsBuilder()
                .setDescription("This is long text, as long as possible to ensure that the builder sends an error if the description is longer than 127 characters")
        }).toThrow("The length of the description must be between 1 and 127 characters.");
    });

    it("category", () => {
        expect(() => {
            new ItemsBuilder()
                .setCategory("test" as CategoryType)
        }).toThrow("Category is invalid. Allowed categories: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION'");
    })

    it("sku", () => {
        expect(() => {
            new ItemsBuilder()
                .setSKU("This is long long text, as long as possible to ensure that the builder sends an error if the sku is longer than 127 characters..")
        }).toThrow("The length of the sku must be between 1 and 127 characters.");
    });
});

describe('ItemBuilder constructor', () => {
    it("empty Item", () => {
        expect(() => {
            new ItemsBuilder()
                .toJSON()
        }).toThrow("The length of the name must be between 1 and 127 characters.")
    });

    it('bad names', () => {
        let builder = new ItemsBuilder({
            name: ''
        });

        expect(() => builder.toJSON()).toThrow("The length of the name must be between 1 and 127 characters.");

        builder = new ItemsBuilder({
            name: 'This is long long text, as long as possible to ensure that the builder sends an error if the title is longer than 127 characters'
        });

        expect(() => builder.toJSON()).toThrow("The length of the name must be between 1 and 127 characters.");
    });

    it('bad descriptions', () => {
        let builder = new ItemsBuilder({
            name: 'test',
            description: "This is long text, as long as possible to ensure that the builder sends an error if the description is longer than 127 characters"
        });

        expect(() => builder.toJSON()).toThrow("The length of the description must be between 1 and 127 characters.");
    });

    it('bad sku', () => {
        let builder = new ItemsBuilder({
            name: 'test',
            sku: '"This is long long text, as long as possible to ensure that the builder sends an error if the sku is longer than 127 characters.."'
        });

        expect(() => builder.toJSON()).toThrow("The length of the sku must be between 1 and 127 characters.");
    });

    it('bad quantity', () => {
        let builder = new ItemsBuilder({
            name: 'test',
            quantity: 1.5
        });

        expect(() => builder.toJSON()).toThrow("The quantity cannot exceed 10 digits, cannot be negative and must be a whole number.");


        builder = new ItemsBuilder({
            name: 'test',
            quantity: -1
        });

        expect(() => builder.toJSON()).toThrow("The quantity cannot exceed 10 digits, cannot be negative and must be a whole number.");


        builder = new ItemsBuilder({
            name: 'test',
            quantity: 10000000000
        });

        expect(() => builder.toJSON()).toThrow("The quantity cannot exceed 10 digits, cannot be negative and must be a whole number.");
    });

    it('bad category', () => {
        let builder = new ItemsBuilder({
            name: 'test',
            category: 'category' as CategoryType
        });

        expect(() => builder.toJSON()).toThrow("Category is invalid. Allowed categories: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION'");
    });
});

describe('ItemBuilder values tests', () => {
    const builder = new ItemsBuilder()
        .setName("required name")
        .setDescription("optional description")
        .setSKU("optional sku")
        .setQuantity(10)
        .setCategory("DIGITAL_GOODS")
        .setUnitAmount({
            currency_code: 'EUR',
            value: 5
        })
        .toJSON();

    it("name", () => {
        expect(builder.name).toBe("required name");
    });

    it("description", () => {
        expect(builder.description).toBe("optional description");
    });

    it("quantity", () => {
        expect(builder.quantity).toBe("10");
    });

    it("category", () => {
        expect(builder.category).toBe("DIGITAL_GOODS");
    });

    it("amount", () => {
        deepEqual(builder.unit_amount, {
            currency_code: 'EUR',
            value: "5"
        });
    });
});