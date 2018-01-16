const router = require('express').Router();
module.exports = router;

const Order = require('../db/models/order');

const gatekeeperMiddleware = require('../../utils/gatekeeperMiddleware');

router.post('/add', (req, res, next) => {
    console.log(req.body);
    Order.create(req.body)
        .then(order => res.status(201).json(order))
        .catch(next);
})

router.delete('/:orderId/delete', (req, res, next) => {
    Order.findById(Number(req.params.orderId))
        .then(order => order.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
})
