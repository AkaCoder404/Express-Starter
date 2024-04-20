/**
 * @fileoverview 
 * 
 */
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { connectDB, redisClient } = require('../src/database');

describe('GET /', () => {
    let server;

    // Start the server before any tests run
    beforeAll(async () => {
        server = app.listen(4000);
        await connectDB();
    });

    // Shut down the server after all tests have run
    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
        await redisClient.quit();
    });

    // Define your tests here
    it('Should return success to /api/v1', async () => {
        const response = await request(server).get('/api/v1');
        expect(response.statusCode).toBe(200);
        // Add more assertions as needed
    });
});
