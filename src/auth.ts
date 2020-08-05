import { createHmac } from "crypto";

export function verify_service_factory(secret: string) {
    const app_secret = secret;
    return function (timestamp: string, sign: string) {
        const hmac = createHmac('sha256', secret);
        const string_to_sign = timestamp + '\n' + app_secret;
        return hmac.update(string_to_sign, 'utf8').digest().toString('base64') === sign;
    }
}

export function webhook_sign_factory(secret: string) {
    const app_secret = secret;
    return function () {
        const timestamp = Date.now();
        const hmac = createHmac('sha256', secret);
        const string_to_sign = timestamp + '\n' + app_secret;
        const sign = hmac.update(string_to_sign, 'utf8').digest().toString('base64');
        return {
            timestamp,
            sign
        };
    }
}