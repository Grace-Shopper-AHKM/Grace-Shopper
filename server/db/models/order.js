const Sequelize = require('sequelize');
const db = require('../db');
const bookOrder = require('./bookOrder');

const Order = db.define('order', {
  sid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
    /*
    4 possible statuses:
    -> 'pending' (order placed, but not yet calculated total, check for inventory)
    -> 'confirmed' (fixed price to charge user to credit card)
    -> 'shipped'
    -> 'delivered'
    */
  }
})

module.exports = Order;

/**
 * instanceMethods
 */

// orderInstance.getOrderTotal().then(v => console.log(v));
Order.prototype.getTotal = (orderInstance) => {
  return bookOrder.findAll({
    where: {
      orderId: orderInstance.id
    }
  })
  .then(foundOrdersArray => {
    return foundOrdersArray.reduce((accum, foundOrder) => {
      return accum + foundOrder.subTotal;
    });
  })
}

/**
 * classMethods
 */

/**
 * hooks
 */
