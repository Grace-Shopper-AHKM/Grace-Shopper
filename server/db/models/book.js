const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-book.jpg'
  },
  sku: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.ENUM('fiction', 'biography', 'graphic novel', 'sports', 'dance', 'general'),
    defaultValue: 'general',
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
