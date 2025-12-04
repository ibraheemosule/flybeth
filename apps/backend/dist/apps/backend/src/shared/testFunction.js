"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFn = testFn;
exports.validateEmail = validateEmail;
function testFn() {
    return "This is a test function from shared-backend";
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
