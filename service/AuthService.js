/* eslint no-magic-numbers: 0, no-undefined: 0, require-atomic-updates: 0 */
const bcrypt = require('bcrypt');
const User = require('../model/UserModel');

/**
 * AuthService
 */
class AuthService {
    /**
     * Validate
     * @param {email} email param
     * @param {password} password param
     * @returns {boolean} boolean value
     */
    async Validate(email, password) {
        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                return false;
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) {
                return false;
            }

            const token = user.generateAuthToken();

            return token;
        } catch (err) {
            throw new Error('Internal server error');
        }
    }
}

module.exports = AuthService;
