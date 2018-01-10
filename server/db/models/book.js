const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-book.jpg'
  },
  sku: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
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
