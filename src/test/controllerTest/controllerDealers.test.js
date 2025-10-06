jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const dealersController = require('../../controllers/dealers');
const Dealers = require('../../models/dealersModel');
const User = require('../../models/usersModel');

jest.mock('../../models/dealersModel');
jest.mock('../../models/usersModel');

describe('Dealers Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {}, user: { _id: 'u1' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('createDealers creates dealer and updates user', async () => {
        req.body = { storeName: 's', storeAddress: 'a', storeAddPincode: 'p' };
        Dealers.create.mockResolvedValue({ _id: 'd1' });
        User.findByIdAndUpdate.mockResolvedValue({});
        await dealersController.createDealers(req, res, next);
        expect(Dealers.create).toHaveBeenCalled();
        expect(User.findByIdAndUpdate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });
});


