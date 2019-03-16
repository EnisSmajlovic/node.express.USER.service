/* eslint no-undefined: 0 */
/* eslint max-lines: 0 */
jest.mock('../service/UserService');

const UserService = require('../service/UserService'),
    ServiceMock = new UserService(),
    UserController = require('../controller/UserController'),
    Subject = new UserController(ServiceMock);

describe('Controller', () => {
    describe('Get', () => {
        describe('When Get is called with required parameters', () => {
            const req = {
                query : {
                    start : 1,
                    rows  : 5
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                await Subject.Get(req, res);
            });

            it('Should be called with all args', () => {
                expect(ServiceMock.Get).toHaveBeenCalledWith(1, 5);
            });

            it('Should return status code 200', () => {
                expect(res.status).toHaveBeenCalledWith(200);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Get receives a valid response', () => {
            const req = {
                query : {
                    start : 0,
                    rows  : 10
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            const user = {
                id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
                email : 'unit@test.com'
            };

            beforeAll(async () => {
                ServiceMock.Get.mockImplementation(() => {
                    return user;
                });
                await Subject.Get(req, res);
            });

            it('Should return a response with data', () => {
                expect(res.send).toHaveBeenCalledWith({
                    id    : '1b671a64-40d5-491e-99b0-da01ff1f3341',
                    email : 'unit@test.com'
                });
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Get receives a invalid response', () => {
            const req = {};

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                ServiceMock.Get.mockImplementation(() => {
                    throw new Error('error');
                });
                await Subject.Get(req, res);
            });

            it('Should return 500 if Gets throws an error', () => {
                expect(res.status).toHaveBeenCalledWith(500);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Get receives an invalid response', () => {
            const req = {
                query : {
                    start : undefined,
                    rows  : undefined
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                await Subject.Get(req, res);
            });

            it('Should return a status 400 response', () => {
                expect(res.status).toHaveBeenCalledWith(400);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe('Create', () => {
        describe('When Create function is called with an invalid response', () => {
            const req = {
                body : {
                    email      : undefined,
                    givenName  : undefined,
                    familyName : undefined,
                    password   : undefined
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                await Subject.Create(req, res);
            });

            it('Should return status 400 error', () => {
                expect(res.status).toHaveBeenCalledWith(400);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Create function is called with a valid response', () => {
            const req = {
                body : {
                    email      : 'test@test.com',
                    givenName  : 'name',
                    familyName : 'surname',
                    password   : 'password123'
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                await Subject.Create(req, res);
            });

            it('Should return a valid response with all params', () => {
                expect(ServiceMock.Create).toHaveBeenCalledWith('test@test.com', 'name', 'surname', 'password123');
            });

            it('Should return a valid status', () => {
                expect(res.status).toHaveBeenCalledWith(200);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Create function is called and user already exists', () => {
            const req = {
                body : {
                    email      : 'test@test.com',
                    givenName  : 'name',
                    familyName : 'surname',
                    password   : 'password123'
                }
            };

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                ServiceMock.Create.mockImplementation(() => {
                    return true;
                });
                await Subject.Create(req, res);
            });

            it('Should return a message to the user', () => {
                expect(res.send).toHaveBeenCalledWith('User is already registered');
            });

            it('Should provide status 400', () => {
                expect(res.status).toHaveBeenCalledWith(400);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Create function throws an exception', () => {
            const req = {};

            const res = {
                status : jest.fn(),
                send   : jest.fn()
            };

            res.status.mockReturnThis();

            beforeAll(async () => {
                ServiceMock.Create.mockImplementation(() => {
                    throw new Error('err');
                });
                await Subject.Create(req, res);
            });

            it('Should provide status 500', () => {
                expect(res.status).toHaveBeenCalledWith(500);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });
    });
});
