const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER, // order should keep the price of the item at the time when they checked out even if the price of the product later changes
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'confirmed' // confirmed -> shipped -> delivered
  }
})

module.exports = Order;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
