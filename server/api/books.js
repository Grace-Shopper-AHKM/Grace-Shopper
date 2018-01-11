const router = require('express').Router();
module.exports = router;

const Book = require('../db/models/book');
const Review = require('../db/models/review');
const User = require('../db/models/user')

router.get('/', (req, res, next) => {
    let whereObj = {};

    if (Object.keys(req.query).length > 0) {
        whereObj.genre = req.query.genre
        Book.findAll({
            where: whereObj
        })
        .then(books => res.json(books))
        .catch(next);
    } else {
        Book.findAll({})
            .then(books => res.json(books))
            .catch(next);
    }

});

router.get('/genres/:genre', (req, res, next) => {
    Book.findAll({
        where: {
            genre: req.params.genre
        }
    })
        .then(books => res.json(books))
        .catch(next);
});

router.get('/:bookId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            bookId: Number(req.params.bookId)
        },
        include: [{model: User}]
    })
        .then(reviews => res.json(reviews))
        .catch(next);
});

router.get('/:bookId', (req, res, next) => {
    Book.findById(Number(req.params.bookId))
        .then(book => res.json(book))
        .catch(next);
});


