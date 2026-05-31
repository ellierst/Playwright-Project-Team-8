import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (!value) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`[env] Missing required variable: ${key}`);
    }
    return value;
}

export const env = {
    baseUrl: getEnv('BASE_URL', 'http://localhost:3000'),

    headless: getEnv('HEADLESS', 'true') === 'true',

    retries: Number(getEnv('RETRIES', '0')),

    timeout: Number(getEnv('TIMEOUT', '30000')),

    testEmail: getEnv('TEST_EMAIL', ''),

    testPassword: getEnv('TEST_PASSWORD', ''),
} as const;