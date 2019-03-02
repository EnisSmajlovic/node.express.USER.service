/* eslint no-magic-numbers: 0 */
const { validateAuth } = require('../validation/Validate');

/**
 * AuthController
 */
class AuthController {
/**
 * @param {AuthService} AuthService injected as constructor
 */
    constructor(AuthService) {
        this.AuthService = AuthService;
    }

    /**
     * Validate
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return created user
     */
    async Validate(req, res) {
        const { value, error } = validateAuth(req.body);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const auth = await this.AuthService.Validate(
                value.email,
                value.password
            );

            if(auth === false) {
                return res.status(400).send('Invalid email or password');
            }

            return res.status(200).send(auth);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = AuthController;
