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
