const User = require('./user');
const Book = require('./book');
const Review = require('./review');
const Order = require('./order');
const BookOrder = require('./BookOrder');

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Order);
Order.belongsTo(User);

Book.belongsToMany(Order, {through: BookOrder});
Order.belongsToMany(Book, {through: BookOrder});

module.exports = {
  User,
  Book,
  Review,
  Order,
  BookOrder
}
