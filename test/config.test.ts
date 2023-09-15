import { config } from "../src";
import { getConfig } from "../src/Functions/Config";
import { deepEqual } from "node:assert";

describe('Test config function', () => {
    it("Default test", () => {
        config({
            client_id: 'test',
            client_secret: 'test'
        });

        deepEqual(getConfig(), {
            mode: 'sandbox',
            base_url: 'https://api-m.sandbox.paypal.com/',
            auto_renew: true,
            token_expire_at: 0,
            client_id: 'test',
            client_secret: 'test'
        });
    });

    it("Error tests", () => {
        expect(() => {
            config({
                client_id: '',
                client_secret: 'test'
            });
        }).toThrow("The `client_id` and `client_secret` value are both required.");

        expect(() => {
            config({
                client_id: 'test',
                client_secret: ''
            });
        }).toThrow("The `client_id` and `client_secret` value are both required.");
        expect(() => {
            config({
                client_id: '',
                client_secret: ''
            });
        }).toThrow("The `client_id` and `client_secret` value are both required.");
    });
});