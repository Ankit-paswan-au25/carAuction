jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const bidController = require('../../controllers/bids');
const Bid = require('../../models/bidModel');

jest.mock('../../models/bidModel');

describe('Bid Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {}, user: { _id: 'u1' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('createBids creates and returns bid', async () => {
        req.body = { auctionId: 'a1', carId: 'c1', bidAmount: 100 };
        Bid.create.mockResolvedValue({ _id: 'b1' });
        await bidController.createBids(req, res, next);
        expect(Bid.create).toHaveBeenCalledWith(expect.objectContaining({ userId: 'u1' }));
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


