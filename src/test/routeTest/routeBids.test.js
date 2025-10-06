jest.mock('../../middleWare/authGuard', () => (req, res, next) => next());
jest.mock('../../controllers/bids/index', () => ({
    getAllBids: (req, res) => res.status(200).json({ route: 'bids:getAll' }),
    createBids: (req, res) => res.status(201).json({ route: 'bids:create' }),
    getSingleBids: (req, res) => res.status(200).json({ route: 'bids:getOne' }),
    updateBids: (req, res) => res.status(200).json({ route: 'bids:update' }),
    deleteBids: (req, res) => res.status(200).json({ route: 'bids:delete' })
}));

const request = require('supertest');
const app = require('../../app');

describe('Bids Routes', () => {
    test('GET /api/v1/bids', async () => {
        const res = await request(app).get('/api/v1/bids');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('bids:getAll');
    });

    test('POST /api/v1/bids', async () => {
        const res = await request(app).post('/api/v1/bids').send({});
        expect(res.status).toBe(201);
        expect(res.body.route).toBe('bids:create');
    });

    test('GET /api/v1/bids/:id', async () => {
        const res = await request(app).get('/api/v1/bids/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('bids:getOne');
    });

    test('PUT /api/v1/bids/:id', async () => {
        const res = await request(app).put('/api/v1/bids/1').send({});
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('bids:update');
    });

    test('DELETE /api/v1/bids/:id', async () => {
        const res = await request(app).delete('/api/v1/bids/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('bids:delete');
    });
});


