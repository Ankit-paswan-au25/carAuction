jest.mock('../../middleWare/authGuard', () => (req, res, next) => next());
jest.mock('../../middleWare/routeGuard', () => (req, res, next) => next());
jest.mock('../../controllers/dealers/index', () => ({
    getAllDealers: (req, res) => res.status(200).json({ route: 'dealers:getAll' }),
    createDealers: (req, res) => res.status(201).json({ route: 'dealers:create' }),
    getSingleDealers: (req, res) => res.status(200).json({ route: 'dealers:getOne' }),
    updateDealers: (req, res) => res.status(200).json({ route: 'dealers:update' }),
    deleteDealers: (req, res) => res.status(200).json({ route: 'dealers:delete' })
}));

const request = require('supertest');
const app = require('../../app');

describe('Dealers Routes', () => {
    test('GET /api/v1/dealers', async () => {
        const res = await request(app).get('/api/v1/dealers');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('dealers:getAll');
    });

    test('POST /api/v1/dealers', async () => {
        const res = await request(app).post('/api/v1/dealers').send({});
        expect(res.status).toBe(201);
        expect(res.body.route).toBe('dealers:create');
    });

    test('GET /api/v1/dealers/:id', async () => {
        const res = await request(app).get('/api/v1/dealers/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('dealers:getOne');
    });

    test('PUT /api/v1/dealers/:id', async () => {
        const res = await request(app).put('/api/v1/dealers/1').send({});
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('dealers:update');
    });

    test('DELETE /api/v1/dealers/:id', async () => {
        const res = await request(app).delete('/api/v1/dealers/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('dealers:delete');
    });
});


