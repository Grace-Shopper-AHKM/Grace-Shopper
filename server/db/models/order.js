const Sequelize = require('sequelize');
const db = require('../db');
const BookOrder = require('./bookOrder');

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
  },
  orderRecipient: {
    type: Sequelize.STRING
  },
  orderEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  orderAddress: {
    type: Sequelize.STRING
  },
  getOrderTotal: {
    type: Sequelize.VIRTUAL,
    get () {
      return BookOrder.findAll({
        where: {
          orderId: this.id
        }
      })
      .then(foundOrdersArray => {
        return foundOrdersArray.reduce((accum, foundOrder) => {
          return accum + foundOrder.subTotal;
        }, 0);
      });
    }
  }
})

module.exports = Order;
