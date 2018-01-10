const Sequelize = require('sequelize')
const db = require('../db')

const bookOrder = db.define('bookOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  subTotal: { // should eventually be a virtual with setter
    type: Sequelize.VIRTUAL, // order should keep the price of the item at the time when they checked out even if the price of the product later changes
    get () {
      return this.getDataValue('quantity') * this.getDataValue('price');
    }
  }
})

module.exports = bookOrder;
