const router = require('express').Router();

const Book = require('../db/models/book');
const Review = require('../db/models/review');
const User = require('../db/models/user');
const gatekeeperMiddleware = require('../../utils/gatekeeperMiddleware');


router.get('/', (req, res, next) => {
    let genre = req.query.genre;
    if (genre) {
        Book.findAll({
            where: {
                genre
            }
        })
            .then(books => res.json(books))
            .catch(next);
    } else {
        Book.findAll({})
            .then(books => res.json(books))
            .catch(next);
    }
});

router.post('/add',
    gatekeeperMiddleware.isLoggedIn,
    gatekeeperMiddleware.isAdmin,
    (req, res, next) => {
        Book.create(req.body)
            .then(book => res.status(201).json(book))
            .catch(next);
    })

router.put('/:bookId/edit',
    gatekeeperMiddleware.isLoggedIn,
    gatekeeperMiddleware.isAdmin,
    (req, res, next) => {
        Book.findById(Number(req.params.bookId))
            .then(book => book.update(req.body))
            .then(book => res.status(201).json(book))
            .catch(next);
    })

router.delete('/:bookId/delete',
    gatekeeperMiddleware.isLoggedIn,
    gatekeeperMiddleware.isAdmin,
    (req, res, next) => {
        Book.findById(Number(req.params.bookId))
            .then(book => book.destroy())
            .then(() => res.sendStatus(204))
            .catch(next);
    })

router.get('/:bookId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            bookId: Number(req.params.bookId)
        },
        include: [{ model: User }]
    })
        .then(reviews => res.json(reviews))
        .catch(next);
});

router.post('/:bookId/reviews',
    gatekeeperMiddleware.isLoggedIn,
    (req, res, next) => {
        Review.create({
            title: req.body.title,
            review: req.body.review,
            rating: req.body.rating,
            userId: req.user.id,
            bookId: Number(req.body.bookId)
        })
            .then(review => res.json(review)) // eager load review before res.json (add name to review)
            .catch(next);
    });

router.get('/:bookId', (req, res, next) => {
    Book.findById(Number(req.params.bookId))
        .then(book => res.json(book))
        .catch(next);
});

module.exports = router;