jest.mock('../model/UserModel', () => {
    const mock = {
        findOne : jest.fn(),
        find    : jest.fn(),
        limit   : jest.fn(),
        skip    : jest.fn(),
        save    : jest.fn()
    };

    mock.find.mockReturnThis();
    mock.limit.mockReturnThis();
    mock.skip.mockReturnThis();
    mock.save.mockReturnThis();

    return mock;
});

const UserModel = require('../model/UserModel'),
    UserService = require('../service/UserService'),
    Subject = new UserService();

describe('Service', () => {
    describe('Get', () => {
        describe('When Get is called', () => {
            beforeAll(async () => {
                await Subject.Get(10, 1);
            });

            it('Should return a valid first argument that has been passed through the function', () => {
                expect(UserModel.skip).toHaveBeenCalledWith(10);
            });

            it('Should return a valid second argument that has been passed through the function', () => {
                expect(UserModel.limit).toHaveBeenCalledWith(1);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });

        describe('When Get throws an exception', () => {
            beforeAll(() => {
                UserModel.find.mockImplementation(() => {
                    throw new Error('err');
                });
            });

            it('Should call Get with first argument', async () => {
                let result;
                try {
                    result = await Subject.Get();
                } catch (err) {
                    result = err;
                }

                expect(result.message).toEqual('Internal server error');
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe('Create', () => {
        describe('When function Create is called', () => {
            const args = {
                email       :   'test@test.com',
                givenName   :   'en',
                familyName  :   'sm',
                password    :   '$2b$10$yAvChulkMZi4X0WK7e.y/usTRFYA6/SeIem3vHdBPp9omb4XLTUoG'
            };

            let result;

            beforeAll(async () => {
                result = await Subject.Create(args);
            });

            it('Should return', () => {
                expect(result).toBe(true);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });
    });
});
