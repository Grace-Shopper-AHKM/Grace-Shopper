const router = require('express').Router();
const {User, Order, BookOrder} = require('../db/models');
const gatekeeperMiddleware = require('../../utils/gatekeeperMiddleware');

router.param('id', (req, res, next, id) => {
  User.findById(Number(id))
    .then(user => {
      if (!user) {
        const error = new Error('No such user!');
        error.status = 404;
        throw error;
      }
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/userorders/:userid', (req, res, next) => {
    let userid = Number(req.params.userid);
    Order.findAll({ attributes: ['id'], where: {userId: userid}})
    .then(orders => {
      let orderIDs = orders.map(order => {return order.id});
      return BookOrder.findAll({where: {orderId: {$in: orderIDs} } })
    })
    .then(bookOrders => {
      res.send(bookOrders)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users.map(user => user.sanitize())))
    .catch(next)
});

router.post('/',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next);
  });

router.get('/:id', (req, res, next) => {
  res.json(req.requestedUser.sanitize());
});

router.put('/:id',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdminOrSelf,
  (req, res, next) => {
    req.requestedUser.update(req.body)
      .then(user => res.json(user))
      .catch(next);
  });

router.delete('/:id',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdminOrSelf,
  (req, res, next) => {
    req.requestedUser.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  });

router.put('/:id/add-to-cart',
  gatekeeperMiddleware.isLoggedIn,
  (req, res, next) => {
    let item = req.body;
    User.findById(req.params.id)
      .then((user) => {
        let currentCart = user.cart;
        if (!currentCart[item.id]) {
          currentCart[item.id] = item;
          user.update({
            cart: currentCart
          })
        }
        else {
          currentCart[item.id].qty += item.qty;
          user.update({
            cart: currentCart
          })
        }
      })
      .then(updatedUser => res.json(updatedUser))
      .catch(next);
  });

router.put('/:id/delete-from-cart',
  gatekeeperMiddleware.isLoggedIn,
  (req, res, next) => {
    let item = req.body;
    User.findById(req.params.id)
      .then((user) => {
        let currentCart = user.cart;
        delete currentCart[Object.keys(item)[0]];
        user.update({
          cart: currentCart
        })
      })
      .then(updatedUser => res.json(updatedUser))
      .catch(next);
  });

router.put('/:id/edit-cart-quantity',
  gatekeeperMiddleware.isLoggedIn,
  (req, res, next) => {
    let item = req.body;
    User.findById(req.params.id)
      .then((user) => {
        let currentCart = user.cart;
        currentCart[item.itemId].qty = item.qty
        user.update({
          cart: currentCart
        })
      })
      .then(updatedUser => res.json(updatedUser))
      .catch(next);
  });

module.exports = router;