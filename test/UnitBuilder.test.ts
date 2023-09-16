import { CurrencyCodes, UnitBuilder } from "../src";

describe('UnitBuilder errors', () => {
    it('price', () => {
        expect(() => {
            new UnitBuilder()
                .setPrice('' as unknown as number)
        }).toThrow("The value field is required and should be a positive number.");

        expect(() => {
            new UnitBuilder()
                .setPrice(NaN)
        }).toThrow("The value field is required and should be a positive number.");

        expect(() => {
            new UnitBuilder()
                .setPrice(-10)
        }).toThrow("The value field is required and should be a positive number.");
    });
});

describe('UnitBuilder currency conflict', () => {
    it('price then currency', () => {
        expect(() => {
            new UnitBuilder()
                .setPrice(2.5)
                .setCurrency('HUF')
        }).toThrow("This currency does not support floating prices.");
    });

    it('currency then price', () => {
        expect(() => {
            new UnitBuilder()
                .setCurrency('HUF')
                .setPrice(2.5)
        }).toThrow("The price could not be floating with the currency HUF");
    });
});

describe('UnitBuilder values', () => {
    const unit = new UnitBuilder({
        overwritePrice: true,
        value: 52.45,
        currency_code: 'TWD'
    });

    const { currency_code, value } = new UnitBuilder()
        .setCurrency(CurrencyCodes.AustralianDollar)
        .setPrice(52)
        .toJSON()

    it('value', () => {
        expect(unit.toJSON().value).toBe("52");
        expect(value).toBe("52");
    });

    it('currency', () => {
        expect(unit.toJSON().currency_code).toBe("TWD");
        expect(currency_code).toBe('AUD');
    });

    it('overwrite price -> currency', () => {
        unit.setCurrency('EUR')
            .setPrice(12.5);
        unit.setCurrency('HUF');

        expect(unit.toJSON().value).toBe("13");
        expect(unit.toJSON().currency_code).toBe("HUF");
    });

    it('overwrite currency -> price', () => {
        unit.setPrice(12.5);

        expect(unit.toJSON().currency_code).toBe("HUF");
        expect(unit.toJSON().value).toBe("13");
    });
});

describe('UnitBuilder JSON errors', () => {
    it('currency', () => {
        expect(() => {
            new UnitBuilder({})
                .toJSON()
        }).toThrow("The currency code field is required.");
    });

    it('value', () => {
        expect(() => {
            new UnitBuilder({
                value: '' as unknown as number,
                currency_code: 'EUR'
            })
                .toJSON()
        }).toThrow("The value field is required and should be a positive number.");

        expect(() => {
            new UnitBuilder({
                value: NaN,
                currency_code: 'EUR'
            })
                .toJSON()
        }).toThrow("The value field is required and should be a positive number.");

        expect(() => {
            new UnitBuilder({
                value: -15,
                currency_code: 'EUR'
            })
                .toJSON()
        }).toThrow("The value field is required and should be a positive number.");
    });

    it('Bad price for currency', () => {
        expect(() => {
            new UnitBuilder({
                value: 15.5,
                currency_code: 'JPY'
            })
                .toJSON()
        }).toThrow("The price could not be floating with the currency JPY");
    });
});