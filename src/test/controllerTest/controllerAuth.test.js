jest.mock('../../utils/asyncErrorhandler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)));
const authController = require('../../controllers/authController');
const User = require('../../models/usersModel');

jest.mock('../../models/usersModel');
jest.mock('../../controllers/authController/helpers', () => ({
    jwtToken: jest.fn(async () => 'fake.jwt.token')
}));
jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(async () => 'salt'),
    hash: jest.fn(async () => 'hashed'),
    compare: jest.fn(async () => true)
}));
jest.mock('validator', () => ({ isEmail: () => true }));

describe('Auth Controller', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('register success returns token', async () => {
        req.body = { username: 'u', password: 'password123', confirmPassword: 'password123', email: 'u@e.com' };
        User.create.mockResolvedValue({ _id: '1', name: 'u', email: 'u@e.com' });
        await authController.register(req, res, next);
        expect(User.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(expect.any(Number));
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    test('login success returns token', async () => {
        req.body = { email: 'u@e.com', password: 'password123' };
        User.findOne = jest.fn().mockReturnValue({ select: jest.fn().mockResolvedValue({ _id: '1', email: 'u@e.com', password: 'hashed' }) });
        await authController.login(req, res, next);
        expect(res.status).toHaveBeenCalledWith(expect.any(Number));
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });
});


