const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Book = db.model('book');

describe('Book routes', () => {
    beforeEach(() => {
        return db.sync({force: true});
    })

    describe('/api/books', () => {
        beforeEach(() => {
                Book.create({
                  title: 'Bossypants',
                  photo: '/images/bossypants.jpg',
                  sku: '4321',
                  genre: 'biography',
                  author: 'Tina Fey',
                  inventory: 6,
                  price: 12,
                  description: 'In this hilarious book, Tina Fey reccounts her adventures from Chicago to SNL and beyond, full of wit, wisdom and how she came to "have it all"!  Liz Lemon rocks.'
                })
                .then(() => {
                    Book.create({
                      title: 'Fantastic Beasts and Where to Find Them',
                      photo: '/images/fantastic-beasts.jpg',
                      sku: '4322',
                      genre: 'fiction',
                      author: 'JK Rowling',
                      inventory: 12,
                      price: 17,
                      description: 'Hogwarts comes to America.  JK Rowling does it again with a menagerie of new magical creatures!  Recently adapted into a movie feature Eddie Redmayne and Colin Farrell!  Really recommended book!'
                    })
                })
        })

        it('GET /api/books', () => {
            return request(app)
                .get('/api/books')
                .expect(200)
                .then(res => {
                    // console.log(res.body)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].title).to.be.equal('Bossypants')
                    expect(res.body[1].author).to.be.equal('JK Rowling')
                })
        })

        it('GET /api/books/:bookId', () => {
            return request(app)
                .get('/api/books/2')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.author).to.be.equal('Tina Fey')
                })
        })
    })
})
