// Example Integration Test

// Example using Supertest and Jest
const request = require('supertest');
const app = require('../src/app');

describe('GET /get_all_users', () => {
    var cookie;
    // Call API Before Login
    test('should not allow access to /get_user without login', async () => {
        const response = await request(app).get('/api/v1/users/get_user');
        expect(response.statusCode).toBe(401);
    });

    // Login
    test('should get authentication token', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({ username: 'John Doe', password: 'password' });
        expect(response.statusCode).toBe(200);
        // expect response to have a cookie
        expect(response.headers['set-cookie']).toBeDefined();
        cookie = response.headers['set-cookie'];
    });

    // Call an invalid API after login
    test('Should return error to /api/v1/does_not_exist', async () => {
        const response = await request(app)
            .get('/api/v1/does_not_exist')
            .set('Cookie', cookie);
        expect(response.statusCode).toBe(500);
    });

    // Call API After Login
    test('should retrieve all users', async () => {
        const response = await request(app)
            .get('/api/v1/users/get_all_users')
            .set('Cookie', cookie); // Pass the stored cookie with the request
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
