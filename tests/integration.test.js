// Example Integration Test

// Example using Supertest and Jest
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { connectDB, redisClient } = require('../src/database');

describe('Basic Integration Test', () => {
    describe('Register and Login', () => {
        var cookie;
        beforeAll(async () => {
            await connectDB();
        });

        afterAll(async () => {
            await mongoose.connection.close();
            await redisClient.quit();
        });
        test('should register a new user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({ username: 'integration_tester8', password: 'password', 'email': 'integration_tester8@test.com' });
            expect(response.statusCode).toBe(201);
        });

        test('should not allow access to /get_user without login', async () => {
            const response = await request(app).get('/api/v1/users/get_user');
            expect(response.statusCode).toBe(401);
        });

        test('should login a user and get token', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({ username: 'integration_tester8', password: 'password' });
            expect(response.statusCode).toBe(200);
            expect(response.headers['set-cookie']).toBeDefined();
            cookie = response.headers['set-cookie'];
        });

        test('login multiple times', async () => {
            // Prior to this test, get the login_cache
            const response_cache = await request(app)
                .get('/api/v1/auth/login_cache')
                .set('Cookie', cookie);
            expect(response_cache.statusCode).toBe(200);
            // "Message": "There has been X logins in the last 5 minutes"
            // Parse 
            const cache_value = parseInt(response_cache.body.message.split(' ')[3]);

            for (let i = 0; i < 5; i++) {
                const response = await request(app)
                    .post('/api/v1/auth/login')
                    .send({ username: 'integration_tester8', password: 'password' });
                expect(response.statusCode).toBe(200);
            }
            // Check if the login_cache is working
            const response = await request(app)
                .get('/api/v1/auth/login_cache')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(200);

            // Expect cache to be incremented by 5
            const post_cache_value = parseInt(response.body.message.split(' ')[3]);
            expect(post_cache_value).toBe(cache_value + 5);
        });

        test('should get user details', async () => {
            const response = await request(app)
                .get('/api/v1/users/get_user')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(200);
            expect(response.body.username).toBe('integration_tester8');
        });

        test('Should return error to /api/v1/does_not_exist', async () => {
            const response = await request(app)
                .get('/api/v1/does_not_exist')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(500);
        });

        test('should get all users', async () => {
            const response = await request(app)
                .get('/api/v1/users/get_all_users')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        test('should delete the user', async () => {
            const response = await request(app)
                .delete('/api/v1/users/delete_user')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User deleted');
        });
    });

});
