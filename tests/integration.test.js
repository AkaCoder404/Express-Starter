// Example Integration Test

// Example using Supertest and Jest
const request = require('supertest');
const app = require('../src/app');

describe('Basic Integration Test', () => {
    describe('Register and Login', () => {
        var cookie;
        test('should register a new user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({ username: 'temp', password: 'password', 'email': 'temp@temp.com' });
            expect(response.statusCode).toBe(201);
        });

        test('should not allow access to /get_user without login', async () => {
            const response = await request(app).get('/api/v1/users/get_user');
            expect(response.statusCode).toBe(401);
        });

        test('should login a user and get token', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({ username: 'temp', password: 'password' });
            expect(response.statusCode).toBe(200);
            expect(response.headers['set-cookie']).toBeDefined();
            cookie = response.headers['set-cookie'];
        });

        test('should get user details', async () => {
            const response = await request(app)
                .get('/api/v1/users/get_user')
                .set('Cookie', cookie);
            expect(response.statusCode).toBe(200);
            expect(response.body.username).toBe('temp');
            console.log(response.body);
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
