const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  //photo url.
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-book.jpeg'
  },
  sku: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING,
  },
  inventory: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //1643 / 100 => 16.43
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Book;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

 //CG - belongsToMany association.
 //how do orders bind with products?
 //an order/cart really just contains products.
 //an order has been placed and prices for products become fixed.
 //think about join table between order and products.
 //ALSO you can add additional attributes to join tables.
