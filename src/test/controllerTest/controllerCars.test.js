const carsController = require('../../controllers/cars');
const Cars = require('../../models/carsModel');

jest.mock('../../models/carsModel');
jest.mock('../../controllers/cars/helpers', () => ({
    createCarObjecttoUpdate: jest.fn(() => ({ model: 'x' }))
}));

describe('Cars Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {}, query: {}, user: { dealerId: 'd1', roleId: 2, _id: 'u1' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('createCars creates and returns car', async () => {
        req.body = { carName: 'c', Brand: 'b', makeYear: 2020, carType: 't', carFeature: 'f', regYear: 2021, fuel: 'p', kmDriven: 1, transmission: 'auto', engineCapicity: 1, auctionId: 'a1' };
        Cars.create.mockResolvedValue({ _id: 'c1' });
        await carsController.createCars(req, res, next);
        expect(Cars.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('getAllCars returns list', async () => {
        Cars.find.mockResolvedValue([{ _id: 'c1' }]);
        await carsController.getAllCars(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
    });

    test('getSingleCars returns one', async () => {
        req.params.id = 'c1';
        Cars.findById.mockResolvedValue({ _id: 'c1' });
        await carsController.getSingleCars(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


