/* eslint no-magic-numbers: 0, no-undefined: 0, require-atomic-updates: 0 */
const bcrypt = require('bcrypt');
const User = require('../model/UserModel');

/**
 * UserService
 */
class UserService {
    /**
     * Get users by query
     * @param {start} start page
     * @param {rows} rows documents
     * @returns {query} documents
     */
    async Get(start, rows) {
        const query = {};

        try {
            const users = await User.find(query)
                .skip(start * rows)
                .limit(rows);

            return { users };
        } catch (err) {
            throw new Error('Internal server error');
        }
    }

    /**
     * Create user
     * @param {email} email param
     * @param {name} name param
     * @param {lastname} lastname param
     * @param {password} password param
     * @returns {user} save document
     */
    async Create(email, name, lastname, password) {
        try {
            let user = await User.findOne({ email: email });
            if(user) {
                return true;
            }

            user = new User({
                email       : email,
                givenName   : name,
                familyName  : lastname,
                password    : password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            user = await user.save();

            const token = user.generateAuthToken();

            return { user, token };
        } catch (err) {
            throw new Error('Internal server error');
        }
    }
}

module.exports = UserService;

/**
 * Console
 
 const NewUserService = new UserService();
 const Create = NewUserService.Create('tsss@tsss.com', 'en', 'sm', '1234567');
 
 Create.then((result) => {
     console.log(result);
    });
    
*/