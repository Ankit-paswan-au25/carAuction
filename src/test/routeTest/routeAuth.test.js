jest.mock('../../middleWare/authGuard', () => (req, res, next) => next());
jest.mock('../../controllers/authController/index', () => ({
    register: (req, res) => res.status(200).json({ route: 'register', ok: true }),
    login: (req, res) => res.status(200).json({ route: 'login', ok: true })
}));

const request = require('supertest');

// Import after mocks
const app = require('../../app');

describe('Auth Routes', () => {
    test('POST /api/v1/auth/register responds 200', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({});
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({ route: 'register', ok: true }));
    });

    test('POST /api/v1/auth/login responds 200', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({});
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({ route: 'login', ok: true }));
    });
});


