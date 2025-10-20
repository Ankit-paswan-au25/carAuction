
jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const usersController = require('../../controllers/users');
const User = require('../../models/usersModel');
jest.mock('../../models/usersModel');

describe('Users Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('getSingleuser returns one', async () => {
        req.params.id = 'c1';
        User.findById.mockResolvedValue({ _id: 'c1' }); // ✅ Correct model mock
        await usersController.getSingleUsers(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            singleUser: { _id: 'c1' }
        });
    });
});
