const router = require('express').Router();

module.exports = (auth) => {
    router.post('/', (req, res) => auth.Validate(req, res));
    return router;
};
