const router = require('express').Router();
module.exports = router;

const Book = require('../db/models/book');
const Review = require('../db/models/review');
const User = require('../db/models/user')

router.get('/', (req, res, next) => {
    Book.findAll({})
        .then(books => res.send(books))
        .catch(next);
});

router.get('/:bookId', (req, res, next) => {
    Book.findById(Number(req.params.bookId))
        .then(book => res.send(book))
        .catch(next);
});

router.get('/:bookId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            bookId: Number(req.params.bookId)
        },
        include: [{model: User}]
    })
        .then(reviews => res.send(reviews))
        .catch(next);
});

router.get('/:genre', (req, res, next) => {
    Book.findAll({
        where: {
            genre: req.params.genre
        }
        // maybe implement an order by here
    })
        .then(books => res.send(books))
        .catch(next);
});
