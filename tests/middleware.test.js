const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { redisClient } = require('../src/database');

describe('Test Middleware', () => {
    afterAll(async () => {
        await mongoose.connection.close();
        await redisClient.quit();
    });

    describe('Rate Limiter Middleware', () => {
        test('should limit requests', async () => {
            const promises = [];

            // Send requests in a loop
            for (let i = 0; i < 101; i++) {
                promises.push(request(app).get('/api/v1'));
            }

            // Wait for all the promises to resolve
            const responses = await Promise.all(promises);

            // Check if any response has a 429 status code
            const isRateLimited = responses.some(
                response => response.status === 429
            );

            expect(isRateLimited).toBeTruthy();
        });
    });
    // TODO Add more tests for other middleware
});