/**
 * @fileoverview 
 * 
 */
const request = require('supertest');
const app = require('../src/app'); // Adjust this path to your app's entry point

describe('GET /', () => {
    let server;

    // Start the server before any tests run
    beforeAll(done => {
        server = app.listen(4000, done);
    });

    // Shut down the server after all tests have run
    afterAll(done => {
        server.close(done);
    });

    // Define your tests here
    it('Should return success to /api/v1', async () => {
        const response = await request(server).get('/api/v1');
        expect(response.statusCode).toBe(200);
        // Add more assertions as needed
    });
});


