jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const auctionController = require('../../controllers/auction');
const Auction = require('../../models/auctionsModel');

jest.mock('../../models/auctionsModel');

describe('Auction Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {}, query: {}, user: { dealerId: 'd1', roleId: 2 } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('createAuctions creates and returns auction', async () => {
        req.body = { carsInAuction: ['c1'], auctionDate: '2025-01-01', autionTime: '10:00', auctionTitle: 'test', auctionDescription: 'test' };
        Auction.create.mockResolvedValue({ _id: 'a1' });
        await auctionController.createAuctions(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('getAllAuctions returns list', async () => {
        Auction.find.mockResolvedValue([{ _id: 'a1' }]);
        await auctionController.getAllAuctions(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


