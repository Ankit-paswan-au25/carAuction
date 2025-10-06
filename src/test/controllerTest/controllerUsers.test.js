jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const usersController = require('../../controllers/users');

describe('Users Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {}, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('createUsers callable', async () => {
        await usersController.createUsers(req, res, next);
        expect(next).toHaveBeenCalledTimes(0);
    });
});


