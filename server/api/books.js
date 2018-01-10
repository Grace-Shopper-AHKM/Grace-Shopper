const router = require('express').Router();
module.exports = router;

const Book = require('../db/models/book');

//yoursite.com/api/books?genre=fiction
router.get('/', (req, res, next) => {
    let whereObj = {};
    if(req.query.genre){
        whereObj.genre = req.query.genre
    }
    Book.findAll({
        where: whereObj
    })
        .then(books => res.send(books))
        .catch(next);
});

router.get('/:bookId', (req, res, next) => {
    //don't use implicit coercion 
    //use json
    Book.findById(+req.params.bookId)
        .then(book => res.send(book))
        .catch(next);
});

//THIS DOES NOT WORK!

//using query params.
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
