import { config } from "../src";
import * as dotenv from 'dotenv';
import { getConfig } from "../src/Functions/Config";
import { deepEqual } from "node:assert";

dotenv.config();

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
            client_id: '',
            client_secret: ''
        });
    });
});