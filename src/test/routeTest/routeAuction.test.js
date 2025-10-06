jest.mock('../../middleWare/authGuard', () => (req, res, next) => next());
jest.mock('../../controllers/auction/index', () => ({
    getAllAuctions: (req, res) => res.status(200).json({ route: 'auction:getAll' }),
    createAuctions: (req, res) => res.status(200).json({ route: 'auction:create' }),
    getSingleAuctions: (req, res) => res.status(200).json({ route: 'auction:getOne' }),
    updateAuctions: (req, res) => res.status(200).json({ route: 'auction:update' }),
    deleteAuctions: (req, res) => res.status(200).json({ route: 'auction:delete' })
}));

const request = require('supertest');
const app = require('../../app');

describe('Auction Routes', () => {
    test('GET /api/v1/auctions', async () => {
        const res = await request(app).get('/api/v1/auctions');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('auction:getAll');
    });

    test('POST /api/v1/auctions', async () => {
        const res = await request(app).post('/api/v1/auctions').send({});
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('auction:create');
    });

    test('GET /api/v1/auctions/:id', async () => {
        const res = await request(app).get('/api/v1/auctions/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('auction:getOne');
    });

    test('PUT /api/v1/auctions/:id', async () => {
        const res = await request(app).put('/api/v1/auctions/1').send({});
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('auction:update');
    });

    test('DELETE /api/v1/auctions/:id', async () => {
        const res = await request(app).delete('/api/v1/auctions/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('auction:delete');
    });
});


