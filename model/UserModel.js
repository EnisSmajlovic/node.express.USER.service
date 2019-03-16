/* eslint no-underscore-dangle: 0 */
const mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    jwt = require('jsonwebtoken'),
    config = require('config');

const UserSchema = new mongoose.Schema({
    id : {
        type     : String,
        required : true,
        default  : uuidv4
    },
    email : {
        type      : String,
        required  : true,
        minlength : 2,
        maxlength : 30
    },
    givenName : {
        type      : String,
        required  : true,
        minlength : 1,
        maxlength : 30
    },
    familyName : {
        type      : String,
        required  : true,
        minlength : 2,
        maxlength : 30
    },
    password : {
        type      : String,
        required  : true,
        minlength : 5,
        maxlength : 1024
    }
},
{
    timestamps : true,
    versionKey : false
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id }, config.get('jwtPrivateKey'));
    return token;
};

module.exports = mongoose.model('User', UserSchema);
