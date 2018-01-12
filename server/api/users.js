const router = require('express').Router();
const {User} = require('../db/models');
const gatekeeperMiddleware = require('../../utils/gatekeeperMiddleware');

router.param('id', (req, res, next, id) => {
  User.findById(id)
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

module.exports = router;
