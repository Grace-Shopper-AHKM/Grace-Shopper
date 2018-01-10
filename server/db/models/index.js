const User = require('./user');
const Book = require('./book');
const Review = require('./review');
const Order = require('./order');
const bookOrder = require('./bookOrder');

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Order);
Order.belongsTo(User);

Book.belongsToMany(Order, {through: bookOrder});
Order.belongsToMany(Book, {through: bookOrder});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Review,
  Order,
  bookOrder
}
