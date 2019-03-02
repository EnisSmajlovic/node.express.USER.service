const router = require('express').Router();

module.exports = (user) => {
    router.get('/', (req, res) => user.Get(req, res));
    router.post('/', (req, res) => user.Create(req, res));
    return router;
};
