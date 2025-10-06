jest.mock('../../middleWare/authGuard', () => (req, res, next) => next());
jest.mock('../../middleWare/routeGuard', () => (req, res, next) => next());
jest.mock('../../controllers/cars/index', () => ({
    getAllCars: (req, res) => res.status(200).json({ route: 'cars:getAll' }),
    createCars: (req, res) => res.status(201).json({ route: 'cars:create' }),
    getSingleCars: (req, res) => res.status(200).json({ route: 'cars:getOne' }),
    updateCars: (req, res) => res.status(200).json({ route: 'cars:update' }),
    deleteCars: (req, res) => res.status(200).json({ route: 'cars:delete' })
}));

const request = require('supertest');
const app = require('../../app');

describe('Cars Routes', () => {
    test('GET /api/v1/cars', async () => {
        const res = await request(app).get('/api/v1/cars');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('cars:getAll');
    });

    test('POST /api/v1/cars', async () => {
        const res = await request(app).post('/api/v1/cars').send({});
        expect(res.status).toBe(201);
        expect(res.body.route).toBe('cars:create');
    });

    test('GET /api/v1/cars/:id', async () => {
        const res = await request(app).get('/api/v1/cars/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('cars:getOne');
    });

    test('PUT /api/v1/cars/:id', async () => {
        const res = await request(app).put('/api/v1/cars/1').send({});
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('cars:update');
    });

    test('DELETE /api/v1/cars/:id', async () => {
        const res = await request(app).delete('/api/v1/cars/1');
        expect(res.status).toBe(200);
        expect(res.body.route).toBe('cars:delete');
    });
});


