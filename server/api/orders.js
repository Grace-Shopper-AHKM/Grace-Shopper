const router = require('express').Router();
const nodemailer = require('nodemailer');
module.exports = router;

const Order = require('../db/models/order');
const BookOrder = require('../db/models/bookOrder');

router.post('/add-order', (req, res, next) => {
    let order = req.body;
    order.sid = req.session.id;
    Order.create(req.body)
        .then(() => {
            let cart = [];
            for (var key in req.session.cart) {
                cart.push(req.session.cart[key]);
            }
            let bookOrder = cart.map((item) => {
                let entry = {
                    quantity: item.qty,
                    bookId: item.id,
                    userId: req.user.id
                };
                return entry;
            });
            Order.findOne({
                where: {
                    sid: req.session.id
                }
            })
                .then((order) => {
                    let finalOrder = bookOrder.map((item) => {
                        item.orderId = order.id;
                        const createEntry = BookOrder.create(item);
                        return createEntry;
                    })
                    Promise.all(bookOrder);
                })

        })
        .then(() => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER || 'fullstack.toyshopper@gmail.com',
                    pass: process.env.GMAIL_PASS || 'Fullst@ck'
                }
            });

            let mailOptions = {
                from: '"Max" <fullstack.toyshopper@gmail.com>',
                to: req.body.orderEmail,
                subject: 'Your boook order is on its way!',
                text: 'boook ORDER ON THE WAY!',
                html: '<b>boook ORDER ON THE WAY!</b>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message sent: %s', info.messageId);
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        })
        .catch(next);
});