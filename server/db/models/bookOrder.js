const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./book')

const BookOrder = db.define('bookOrder', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fixedPrice: {
    type: Sequelize.INTEGER
  },
  subTotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = BookOrder;

BookOrder.beforeCreate((orderInstance) => {
  return Book.findById(orderInstance.bookId)
  .then(orderedBook => {
    orderInstance.fixedPrice = orderedBook.price
    orderInstance.subTotal = orderInstance.quantity * orderInstance.fixedPrice;
  });
});
