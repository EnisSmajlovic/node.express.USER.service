/* eslint no-magic-numbers: 0 */
const { validateQuery, validateUser } = require('../validation/Validate');

/**
 * Controller
 */
class UserController {
    /**
     * @param {UserService} UserService injected as constructor
     */
    constructor(UserService) {
        this.UserService = UserService;
    }

    /**
     * Get users by query
     * @param {req} req request
     * @param {res} res response
     * @returns {users} return users
     */
    async Get(req, res) {
        const { value, error } = validateQuery(req.query);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const users = await this.UserService.Get(
                value.start,
                value.rows
            );

            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    /**
     * Create user
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return created user
     */
    async Create(req, res) {
        const { value, error } = validateUser(req.body);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const user = await this.UserService.Create(
                value.email,
                value.givenName,
                value.familyName,
                value.password
            );

            if(user === 'exists') {
                return res.status(400).send('User is already registered');
            }

            return res.status(200).header('x-auth-token', user.token).send({
                email      : value.email,
                givenName  : value.givenName,
                familyName : value.familyName
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = UserController;
