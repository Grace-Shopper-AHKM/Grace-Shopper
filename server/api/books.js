const router = require('express').Router();
module.exports = router;

const Book = require('../db/models/book');

router.get('/', (req, res, next) => {
    Book.findAll({})
        .then(books => res.send(books))
        .catch(next);
});

router.get('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId)
        .then(book => res.send(book))
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
