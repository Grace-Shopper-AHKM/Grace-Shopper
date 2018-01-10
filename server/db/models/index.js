const User = require('./user');
const Book = require('./book');
const Review = require('./review');
const Order = require('./order');

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Book);
Book.belongsToMany(Order, {through: 'Book'});
Order.belongsTo(Order, {as: 'parent'}); // all orders that have same parentId are all books in the same order

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
  Order
}
