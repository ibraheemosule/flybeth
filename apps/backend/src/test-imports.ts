// Test file to verify clean imports
import { testFn, validateEmail } from './shared';
import { AuthUtils } from '@packages/shared-utils';
import { formatDate } from '@packages/shared-utils';

console.log('Testing clean imports:');
console.log(testFn());
console.log('Email validation:', validateEmail('test@example.com'));
console.log('Date formatting:', formatDate(new Date()));

const authConfig = {
  jwtSecret: 'test-secret',
  refreshSecret: 'test-refresh-secret'
};

const authUtils = new AuthUtils(authConfig);
const testPayload = { userId: '1', email: 'test@example.com', userType: 'CONSUMER' };
const token = authUtils.generateJWT(testPayload);

console.log('JWT generation working:', token ? 'Yes' : 'No');